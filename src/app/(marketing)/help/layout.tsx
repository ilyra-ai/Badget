import { constructMetadata } from "@/lib/construct-metadata";

export const metadata = constructMetadata({
  title: "Help Center - Lyra-finAI",
  description: "Find answers to common questions and learn how to get the most out of Lyra-finAI.",
});

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}