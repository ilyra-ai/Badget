import os
import subprocess
import sys
from getpass import getpass
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def prompt(label, secret=False):
    while True:
        value = getpass(label + ": ") if secret else input(label + ": ")
        value = value.strip()
        if value:
            return value
        print("Valor obrigatorio.")


def load_env(path):
    data = {}
    if path.exists():
        for line in path.read_text().splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            if "=" not in line:
                continue
            key, value = line.split("=", 1)
            data[key.strip()] = value.strip()
    return data


def write_env(path, data):
    lines = []
    for key, value in data.items():
        if value is None:
            continue
        lines.append(f"{key}={value}")
    path.write_text("\n".join(lines) + "\n")


def ensure_pnpm():
    try:
        subprocess.run(["pnpm", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except (FileNotFoundError, subprocess.CalledProcessError):
        sys.stderr.write("pnpm nao encontrado. Instale pnpm antes de continuar.\n")
        sys.exit(1)


def update_docker_compose():
    path = ROOT / "docker-compose.yml"
    if not path.exists():
        return
    replacement = (
        "services:\n"
        "  app:\n"
        "    build:\n"
        "      context: .\n"
        "      dockerfile: Dockerfile\n"
        "    env_file:\n"
        "      - .env\n"
        "    ports:\n"
        "      - \"3000:3000\"\n"
    )
    path.write_text(replacement)


def run_prisma(env_vars):
    subprocess.run(["pnpm", "install", "--frozen-lockfile"], check=True)
    subprocess.run(["pnpm", "db:generate"], check=True, env=env_vars)
    subprocess.run(["pnpm", "db:push"], check=True, env=env_vars)


def main():
    print("Configuracao do Supabase")
    organization = prompt("Organizacao")
    project_name = prompt("Nome do projeto no Supabase")
    project_ref = prompt("Referencia do projeto Supabase")
    supabase_url = prompt("VITE_SUPABASE_URL")
    anon_key = prompt("VITE_SUPABASE_ANON_KEY")
    service_role_key = prompt("SUPABASE_SERVICE_ROLE_KEY", secret=True)
    db_password = prompt("Senha do banco de dados Supabase", secret=True)
    database_url = f"\"postgresql://postgres:{db_password}@{project_ref}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1\""
    direct_url = f"\"postgresql://postgres:{db_password}@{project_ref}.supabase.co:5432/postgres\""
    env_path = ROOT / ".env"
    env_data = load_env(env_path)
    for key in list(env_data.keys()):
        if key.startswith("POSTGRES_"):
            env_data.pop(key)
    env_updates = {
        "SUPABASE_ORGANIZATION": organization,
        "SUPABASE_PROJECT_NAME": project_name,
        "SUPABASE_PROJECT_REF": project_ref,
        "DATABASE_URL": database_url,
        "DIRECT_URL": direct_url,
        "SUPABASE_SERVICE_ROLE_KEY": service_role_key,
        "VITE_SUPABASE_URL": supabase_url,
        "VITE_SUPABASE_ANON_KEY": anon_key,
        "NEXT_PUBLIC_SUPABASE_URL": supabase_url,
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": anon_key
    }
    env_data.update(env_updates)
    write_env(env_path, env_data)
    ensure_pnpm()
    env_for_commands = os.environ.copy()
    env_for_commands.update({
        "DATABASE_URL": database_url.strip("\""),
        "DIRECT_URL": direct_url.strip("\""),
        "SUPABASE_SERVICE_ROLE_KEY": service_role_key
    })
    run_prisma(env_for_commands)
    update_docker_compose()
    print("Configuracao concluida.")


if __name__ == "__main__":
    main()
