import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex mx-auto max-w-6xl items-center w-full py-6 bg-background z-50">
      <strong>quicklinkr.</strong>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
