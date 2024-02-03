"use client";

import { authPopup } from "@/lib/auth-popup";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";

const GetStarted = () => {
  return (
    <>
      <Button
        onClick={() => authPopup("/google-signin", "Sample Sign In")}
        className={buttonVariants({
          size: "sm",
        })}
      >
        Get started <ArrowRight className="ml-1.5 h-5 w-5" />
      </Button>
    </>
  );
};

export default GetStarted;
