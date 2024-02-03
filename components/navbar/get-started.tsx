"use client";

import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";

const GetStarted = () => {
  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  return (
    <>
      <Button
        onClick={() => popupCenter("/google-signin", "Sample Sign In")}
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
