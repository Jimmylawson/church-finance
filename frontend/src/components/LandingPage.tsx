import {
  featureItems,
  previewExpenseMix,
  previewIncomeMix,
  recentRecords,
  statItems,
  stepItems,
} from "../data/landingPageData";
import CallToActionSection from "./landing/CallToActionSection";
import FeaturesSection from "./landing/FeaturesSection";
import HeroSection from "./landing/HeroSection";
import HowItWorksSection from "./landing/HowItWorksSection";
import Navbar from "./landing/Navbar";
import PreviewSection from "./landing/PreviewSection";

function LandingPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-8 lg:px-10">
        <Navbar />
        <main>
          <HeroSection stats={statItems} recentRecords={recentRecords} />
          <FeaturesSection features={featureItems} />
          <PreviewSection
            contributionMix={previewIncomeMix}
            expenseMix={previewExpenseMix}
          />
          <HowItWorksSection steps={stepItems} />
          <CallToActionSection />
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
