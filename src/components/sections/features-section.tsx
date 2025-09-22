"use client";

import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { PiggyBank, BarChart3 } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { useMarketingContent } from "@/lib/marketing-translations";

export default function FeaturesSection() {
  const { featuresSection } = useMarketingContent();
  const [
    firstCard = { eyebrow: "", heading: "", body: "" },
    secondCard = { eyebrow: "", heading: "", body: "" },
  ] = featuresSection.cards;
  const metrics = featuresSection.highlight.metrics;

  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center w-full relative px-5 md:px-10"
    >
      <div className="border-x mx-5 md:mx-10 relative">
        {/* Decorative borders */}
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-gray-950/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-gray-950/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>

        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1">
            {featuresSection.title}
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium">
            {featuresSection.description}
          </p>
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          <FeatureCard>
            <div className="p-6">
              <span className="text-muted-foreground flex items-center gap-2">
                <PiggyBank className="size-4" />
                {firstCard.eyebrow}
              </span>
              <p className="mt-8 text-2xl font-semibold">
                {firstCard.heading}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{firstCard.body}</p>
            </div>

            <div className="relative mb-6 border-t border-dashed sm:mb-0 flex-1">
              <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-secondary),var(--color-background)_100%)]"></div>
              <div className="aspect-76/59 p-1 px-6">
                <DualModeImage
                  darkSrc="/feature1.png"
                  lightSrc="/feature1-black.png"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard>
            <div className="p-6">
              <span className="text-muted-foreground flex items-center gap-2">
                <BarChart3 className="size-4" />
                {secondCard.eyebrow}
              </span>
              <p className="mt-8 text-2xl font-semibold">
                {secondCard.heading}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{secondCard.body}</p>
            </div>

            <div className="relative mb-6 sm:mb-0 flex-1">
              <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,var(--color-background)_100%)]"></div>
              <div className="aspect-76/59 border">
                <DualModeImage
                  darkSrc="/feature2-black.png"
                  lightSrc="/feature2.png"
                  alt="calendar illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard className="lg:col-span-2 min-h-[400px]">
            <div className="relative w-full h-full">
              {/* Background gradient matching hero section */}
              <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-lg"></div>

              <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full">
                <p className="mx-auto mb-8 max-w-md text-balance text-center text-2xl font-semibold text-primary">
                  {featuresSection.highlight.description}
                </p>

                <div className="flex justify-center gap-6 overflow-hidden">
                  <CircularUI
                    label={metrics[0]}
                    circles={[{ pattern: "border" }, { pattern: "border" }]}
                  />

                  <CircularUI
                    label={metrics[1] ?? ""}
                    circles={[{ pattern: "none" }, { pattern: "primary" }]}
                  />

                  <CircularUI
                    label={metrics[2] ?? ""}
                    circles={[{ pattern: "blue" }, { pattern: "none" }]}
                  />

                  <CircularUI
                    label={metrics[3] ?? ""}
                    circles={[{ pattern: "primary" }, { pattern: "none" }]}
                    className="hidden sm:block"
                  />
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <div
    className={cn(
      "flex flex-col items-start justify-start min-h-[600px] md:min-h-[500px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer",
      className
    )}
  >
    {children}
  </div>
);

interface DualModeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const DualModeImage = ({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
}: DualModeImageProps) => (
  <>
    <Image
      src={darkSrc}
      className={cn("hidden dark:block", className)}
      alt={`${alt} dark`}
      width={width}
      height={height}
    />
    <Image
      src={lightSrc}
      className={cn("shadow dark:hidden", className)}
      alt={`${alt} light`}
      width={width}
      height={height}
    />
  </>
);

interface CircleConfig {
  pattern: "none" | "border" | "primary" | "blue";
}

interface CircularUIProps {
  label: string;
  circles: CircleConfig[];
  className?: string;
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
  <div className={className}>
    <div className="bg-linear-to-b from-border size-fit rounded-2xl to-transparent p-px">
      <div className="bg-linear-to-b from-background to-muted/25 relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4">
        {circles.map((circle, i) => (
          <div
            key={i}
            className={cn("size-7 rounded-full border sm:size-8", {
              "border-primary": circle.pattern === "none",
              "border-primary bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "border",
              "border-primary bg-background bg-[repeating-linear-gradient(-45deg,var(--color-primary),var(--color-primary)_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "primary",
              "bg-background z-1 border-blue-500 bg-[repeating-linear-gradient(-45deg,var(--color-blue-500),var(--color-blue-500)_1px,transparent_1px,transparent_4px)]":
                circle.pattern === "blue",
            })}
          ></div>
        ))}
      </div>
    </div>
    <span className="text-muted-foreground mt-1.5 block text-center text-sm">
      {label}
    </span>
  </div>
);
