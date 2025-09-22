"use client";

import SignUp from "@/components/auth/sign-up";
import { useMarketingLocale } from "@/lib/marketing-translations";

const copy = {
  en: {
    title: "Create your Lyra-finAI account",
    subtitle: "Start for free and experience AI-guided money management in minutes.",
  },
  pt: {
    title: "Crie sua conta na Lyra-finAI",
    subtitle: "Comece grátis e organize suas finanças com IA em poucos minutos.",
  },
} satisfies Record<"en" | "pt", { title: string; subtitle: string }>;

export default function SignUpPage() {
  const { locale } = useMarketingLocale();
  const content = copy[locale];

  return (
    <main className="flex flex-col items-center justify-start min-h-[80vh] w-full py-20 px-5">
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-center">
        {content.title}
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        {content.subtitle}
      </p>
      <SignUp />
    </main>
  );
}
