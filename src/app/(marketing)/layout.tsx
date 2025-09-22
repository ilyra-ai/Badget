import { Navbar } from "@/components/sections/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { MarketingProvider } from "@/lib/marketing-translations";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingProvider>
      <div className="max-w-7xl mx-auto border-x relative">
        <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
        <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
        <Navbar />
        {children}
        <FooterSection />
      </div>
    </MarketingProvider>
  );
}
