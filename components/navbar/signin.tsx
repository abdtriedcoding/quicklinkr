"use client";

import { authPopup } from "@/lib/auth-popup";
import { Button, buttonVariants } from "../ui/button";

const SignIn = () => {
  return (
    <Button
      onClick={() => authPopup("/google-signin", "Sample Sign In")}
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
      })}
    >
      Sign in
    </Button>
  );
};

export default SignIn;
