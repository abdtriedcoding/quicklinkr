import BrandingText from "@/app/(marketing)/_components/branding-text";
import BrandingImage from "@/app/(marketing)/_components/branding-image";
import FeatureSection from "@/app/(marketing)/_components/feature-section";
import Navbar from "@/components/navbar";

const MarketingPage = async () => {
  return (
    <>
      <Navbar />
      <BrandingText />
      <BrandingImage />
      <FeatureSection />
    </>
  );
};

export default MarketingPage;
