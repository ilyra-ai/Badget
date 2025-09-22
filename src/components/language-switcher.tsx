"use client";

import { useMarketingLocale } from "@/lib/marketing-translations";

type LanguageOption = {
  value: "en" | "pt";
  label: string;
};

const options: LanguageOption[] = [
  { value: "en", label: "EN" },
  { value: "pt", label: "PT" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useMarketingLocale();

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as "en" | "pt")}
        aria-label="Select language"
        className="h-9 rounded-full border border-border bg-background px-4 text-sm font-medium text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
