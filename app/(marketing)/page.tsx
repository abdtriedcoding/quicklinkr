import BrandingText from "@/app/(marketing)/_components/branding-text";
import BrandingImage from "@/app/(marketing)/_components/branding-image";
import FeatureSection from "@/app/(marketing)/_components/feature-section";
import getCurrentUser from "../actions/getCurrentUser";

const MarketingPage = async () => {
  const user = await getCurrentUser();
  console.log(user);

  return (
    <>
      <BrandingText />
      <BrandingImage />
      <FeatureSection />
    </>
  );
};

export default MarketingPage;
