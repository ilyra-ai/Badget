"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/config";

type MarketingLocale = "en" | "pt";

type FeaturesContent = {
  title: string;
  description: string;
  cards: {
    eyebrow: string;
    heading: string;
    body: string;
  }[];
  highlight: {
    description: string;
    metrics: string[];
  };
};

type PricingItem = (typeof siteConfig.pricing.pricingItems)[number] & {
  included?: string | null;
};

type PricingContent = Omit<typeof siteConfig.pricing, "pricingItems"> & {
  pricingItems: PricingItem[];
};

type MarketingContent = {
  nav: typeof siteConfig.nav;
  hero: typeof siteConfig.hero;
  bentoSection: typeof siteConfig.bentoSection;
  quoteSection: typeof siteConfig.quoteSection;
  pricing: PricingContent;
  faqSection: typeof siteConfig.faqSection;
  ctaSection: typeof siteConfig.ctaSection;
  footer: {
    brand: string;
    description: string;
    columns: typeof siteConfig.footerLinks;
    marquee: {
      desktop: string;
      mobile: string;
    };
  };
  featuresSection: FeaturesContent;
};

const englishFeatures: FeaturesContent = {
  title: "Tailored for Your Financial Success",
  description:
    "Every recommendation, insight, and suggestion is personalized to your unique financial situation and goals.",
  cards: [
    {
      eyebrow: "Custom Budget Optimization",
      heading: "AI creates budgets that actually work for your lifestyle, automatically adjusting to help you save more.",
      body: "Get proactive recommendations on where to cut back, when to invest, and how to stretch every dollar further.",
    },
    {
      eyebrow: "Behavioral Spending Insights",
      heading: "Understand your spending patterns and discover optimization opportunities through AI-powered analysis.",
      body: "Spot trends, receive alerts for unusual activity, and act on tailored suggestions that keep you on track.",
    },
  ],
  highlight: {
    description:
      "AI-powered insights that adapt to your unique financial patterns and goals.",
    metrics: ["Income", "Budget", "Savings", "Goals"],
  },
};

const portugueseFeatures: FeaturesContent = {
  title: "Planejada para o seu sucesso financeiro",
  description:
    "Cada recomendação, insight e sugestão é personalizada para a sua realidade financeira e seus objetivos.",
  cards: [
    {
      eyebrow: "Otimização inteligente de orçamento",
      heading:
        "A IA cria orçamentos que funcionam para o seu estilo de vida, ajustando automaticamente para ajudar você a economizar mais.",
      body: "Receba recomendações proativas sobre onde economizar, quando investir e como aproveitar melhor cada real.",
    },
    {
      eyebrow: "Insights de comportamento de gastos",
      heading:
        "Entenda seus padrões de consumo e descubra oportunidades de otimização com análises impulsionadas por IA.",
      body: "Identifique tendências, receba alertas sobre movimentações incomuns e siga sugestões sob medida para manter o controle.",
    },
  ],
  highlight: {
    description:
      "Insights com IA que se adaptam aos seus padrões financeiros e metas.",
    metrics: ["Renda", "Orçamento", "Poupança", "Metas"],
  },
};

const englishContent: MarketingContent = {
  nav: {
    links: [
      { id: 1, name: "Home", href: "#hero" },
      { id: 2, name: "How it Works", href: "#bento" },
      { id: 3, name: "Features", href: "#features" },
      { id: 4, name: "Pricing", href: "#pricing" },
      { id: 5, name: "Blog", href: "/blog" },
      { id: 6, name: "Help", href: "/help" },
    ],
  },
  hero: {
    ...siteConfig.hero,
    badge: "AI-powered financial insights",
    title: "Master Your Money With AI",
    description:
      "Lyra-finAI turns raw transactions into real-time spending insights, predictive budgets, and a holistic financial health score. Spend smarter, save faster.",
    cta: {
      primary: { text: "Try for Free", href: "/sign-up" },
      secondary: { text: "Sign In", href: "/sign-in" },
    },
  },
  bentoSection: siteConfig.bentoSection,
  quoteSection: {
    ...siteConfig.quoteSection,
    primaryButton: {
      text: "Start Your Free Journey",
      href: "/sign-up",
    },
  },
  pricing: {
    ...siteConfig.pricing,
    pricingItems: siteConfig.pricing.pricingItems.map((tier) => {
      if (tier.name === "Free") {
        return { ...tier, href: "/sign-up", included: null };
      }
      if (tier.name === "Premium") {
        return {
          ...tier,
          href: "/sign-up",
          included: "Everything in Free +",
        };
      }
      return {
        ...tier,
        href: "/sign-up",
        included: "Everything in Premium +",
      };
    }),
  },
  faqSection: siteConfig.faqSection,
  ctaSection: {
    ...siteConfig.ctaSection,
    button: {
      text: "Start Your Free Financial Journey Today",
      href: "/sign-up",
    },
  },
  footer: {
    brand: "Lyra-finAI",
    description: siteConfig.hero.description,
    columns: siteConfig.footerLinks,
    marquee: {
      desktop: "Lyra-finAI helps you grow wealth",
      mobile: "Lyra-finAI",
    },
  },
  featuresSection: englishFeatures,
};

const portugueseContent: MarketingContent = {
  nav: {
    links: [
      { id: 1, name: "Início", href: "#hero" },
      { id: 2, name: "Como Funciona", href: "#bento" },
      { id: 3, name: "Recursos", href: "#features" },
      { id: 4, name: "Planos", href: "#pricing" },
      { id: 5, name: "Blog", href: "/blog" },
      { id: 6, name: "Ajuda", href: "/help" },
    ],
  },
  hero: {
    ...siteConfig.hero,
    badge: "Insights financeiros com IA",
    title: "Domine seu dinheiro com IA",
    description:
      "Lyra-finAI transforma transações em insights de gastos em tempo real, orçamentos preditivos e um índice completo de saúde financeira.",
    cta: {
      primary: { text: "Experimente Grátis", href: "/sign-up" },
      secondary: { text: "Entrar", href: "/sign-in" },
    },
  },
  bentoSection: {
    ...siteConfig.bentoSection,
    title: "Potencialize suas finanças com IA",
    description:
      "Receba insights instantâneos de gastos, orçamentos preditivos e monitore sua saúde financeira em tempo real.",
    items: siteConfig.bentoSection.items.map((item) => {
      switch (item.id) {
        case 1:
          return {
            ...item,
            title: "Análise de gastos em tempo real",
            description:
              "Acompanhe cada transação na hora. Receba insights imediatos sobre padrões, gastos incomuns e desempenho do orçamento.",
          };
        case 2:
          return {
            ...item,
            title: "Integração bancária segura",
            description:
              "Conecte todas as suas contas financeiras com segurança. Painel unificado para bancos, cartões, investimentos e cripto.",
          };
        case 3:
          return {
            ...item,
            title: "Índice de saúde financeira",
            description:
              "Visualize sua saúde financeira de forma holística e acompanhe recomendações acionáveis para melhorar sua pontuação.",
          };
        case 4:
          return {
            ...item,
            title: "Orçamento inteligente",
            description:
              "A IA cria e ajusta seu orçamento automaticamente. Receba alertas de excesso e dicas para manter o foco.",
          };
        default:
          return item;
      }
    }),
  },
  quoteSection: {
    ...siteConfig.quoteSection,
    subtitle: "Transforme suas finanças.",
    title: "Assuma o controle hoje",
    description:
      "Junte-se a milhares de usuários que melhoraram sua saúde financeira com insights de IA e orçamentos preditivos.",
    primaryButton: {
      text: "Comece sua jornada gratuita",
      href: "/sign-up",
    },
    secondaryButton: {
      ...siteConfig.quoteSection.secondaryButton,
      text: "Fale com o fundador",
    },
  },
  pricing: {
    ...siteConfig.pricing,
    title: "Planos que evoluem com você",
    description:
      "Comece grátis e faça upgrade quando precisar de mais recursos. Cancele quando quiser, sem taxas escondidas.",
    pricingItems: siteConfig.pricing.pricingItems.map((tier) => {
      const base = { ...tier, href: "/sign-up", included: null as string | null };
      if (tier.name === "Free") {
        return {
          ...base,
          name: "Gratuito",
          buttonText: "Comece grátis",
          description: "Ideal para começar a organizar suas finanças pessoais",
          features: [
            "Conecte até 2 contas",
            "Insights básicos de gastos",
            "Controle simples de orçamento",
            "Pontuação mensal de saúde financeira",
          ],
        };
      }
      if (tier.name === "Premium") {
        return {
          ...base,
          name: "Premium",
          buttonText: "Assine o Premium",
          description:
            "Perfeito para pessoas e famílias que levam o controle financeiro a sério",
          features: [
            "Conexões ilimitadas de contas",
            "Análises avançadas de gastos com IA",
            "Orçamento preditivo e projeções",
            "Alertas e notificações em tempo real",
            "Monitoramento de investimentos",
            "Metas financeiras personalizadas",
            "Exportação de dados e relatórios",
            "Suporte prioritário",
          ],
          included: "Tudo do Gratuito +",
        };
      }
      return {
        ...base,
        name: "Família",
        buttonText: "Plano Família",
        description:
          "Compartilhe com até 5 membros e mantenha todos alinhados aos objetivos financeiros",
        features: [
          "Até 5 perfis conectados",
          "Metas colaborativas",
          "Categorias personalizadas por membro",
          "Alertas compartilhados de orçamento",
          "Relatórios familiares",
          "Gestão de assinaturas domésticas",
          "Insights de poupança conjunta",
          "Suporte dedicado",
        ],
        included: "Tudo do Premium +",
      };
    }),
  },
  faqSection: {
    ...siteConfig.faqSection,
    title: "Perguntas frequentes",
    description:
      "As respostas para as dúvidas mais comuns sobre a Lyra-finAI. Caso precise de algo mais, fale conosco.",
    faQitems: siteConfig.faqSection.faQitems.map((item) => {
      switch (item.id) {
        case 1:
          return {
            ...item,
            question: "O que é a Lyra-finAI?",
            answer:
              "A Lyra-finAI é uma plataforma de finanças pessoais com IA que transforma suas transações em insights acionáveis, cria orçamentos preditivos e calcula uma pontuação completa de saúde financeira.",
          };
        case 2:
          return {
            ...item,
            question: "Como a Lyra-finAI analisa meus gastos?",
            answer:
              "Utilizamos algoritmos avançados para categorizar transações, identificar padrões de consumo, detectar movimentações incomuns e prever fluxo de caixa.",
          };
        case 3:
          return {
            ...item,
            question: "Meus dados financeiros estão seguros?",
            answer:
              "Sim. Utilizamos criptografia de nível bancário, data centers seguros e nunca armazenamos suas credenciais. Seus dados são protegidos como nas grandes instituições financeiras.",
          };
        case 4:
          return {
            ...item,
            question: "Quais bancos posso conectar?",
            answer:
              "Conecte-se a mais de 10.000 instituições, incluindo bancos, cooperativas, cartões de crédito, investimentos e carteiras cripto por meio de APIs seguras.",
          };
        case 5:
          return {
            ...item,
            question: "Existe uma versão gratuita?",
            answer:
              "Sim. O plano gratuito oferece insights básicos de gastos, controle simples de orçamento e pontuação mensal de saúde financeira para até 2 contas.",
          };
        case 6:
          return {
            ...item,
            question: "Como a Lyra-finAI me ajuda a economizar?",
            answer:
              "A plataforma identifica padrões de gastos, sugere ajustes de orçamento, avisa sobre despesas incomuns e prevê cenários futuros para você poupar mais.",
          };
        default:
          return item;
      }
    }),
  },
  ctaSection: {
    ...siteConfig.ctaSection,
    title: "Planeje. Otimize. Prospere.",
    button: {
      text: "Crie sua conta gratuita",
      href: "/sign-up",
    },
    subtext: "Sem cartão de crédito, faça upgrade quando quiser",
  },
  footer: {
    brand: "Lyra-finAI",
    description:
      "Lyra-finAI transforma dados financeiros em decisões inteligentes com IA.",
    columns: siteConfig.footerLinks.map((column) => {
      if (column.title === "Company") {
        return {
          ...column,
          title: "Empresa",
          links: column.links.map((link) => {
            const mapping: Record<number, string> = {
              1: "Sobre",
              2: "Contato",
              3: "Blog",
              4: "História",
            };
            return { ...link, title: mapping[link.id] ?? link.title };
          }),
        };
      }
      if (column.title === "Products") {
        return {
          ...column,
          title: "Produtos",
          links: column.links.map((link) => {
            const mapping: Record<number, string> = {
              5: "Plataforma",
              6: "Dashboard",
              7: "Open Startup",
              8: "Comunidade",
            };
            return { ...link, title: mapping[link.id] ?? link.title };
          }),
        };
      }
      if (column.title === "Resources") {
        return {
          ...column,
          title: "Recursos",
          links: column.links.map((link) => {
            const mapping: Record<number, string> = {
              9: "Imprensa",
              10: "Carreiras",
              11: "Newsletter",
              12: "Central de ajuda",
            };
            return { ...link, title: mapping[link.id] ?? link.title };
          }),
        };
      }
      return column;
    }),
    marquee: {
      desktop: "Lyra-finAI cuida do seu futuro financeiro",
      mobile: "Lyra-finAI",
    },
  },
  featuresSection: portugueseFeatures,
};

const translations: Record<MarketingLocale, MarketingContent> = {
  en: englishContent,
  pt: portugueseContent,
};

type MarketingContextValue = {
  locale: MarketingLocale;
  setLocale: (locale: MarketingLocale) => void;
  content: MarketingContent;
};

const MarketingContext = createContext<MarketingContextValue>({
  locale: "en",
  setLocale: () => undefined,
  content: translations.en,
});

export function MarketingProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<MarketingLocale>("en");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem("lyra-marketing-locale") as MarketingLocale | null;
    if (stored === "en" || stored === "pt") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("lyra-marketing-locale", locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
      content: translations[locale],
    }),
    [locale],
  );

  return <MarketingContext.Provider value={value}>{children}</MarketingContext.Provider>;
}

export function useMarketingContent() {
  return useContext(MarketingContext).content;
}

export function useMarketingLocale() {
  const { locale, setLocale } = useContext(MarketingContext);
  return { locale, setLocale };
}
