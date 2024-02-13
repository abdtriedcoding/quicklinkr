"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { authPopup } from "@/lib/auth-popup";

const BrandingText = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            Quicklinkr is now public!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Create shareable link of your
          <span className="text-blue-600">documents</span> in seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Quicklinkr allows you to create link of your documents in seconds.
          Simply upload your file and you will get link of it. You can easily
          share it with anyone.
        </p>

        {session?.user ? (
          <Link
            className={buttonVariants({
              size: "lg",
              className: "mt-5",
            })}
            href="/dashboard"
            target="_blank"
          >
            Enter quicklinkr <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        ) : (
          <Button
            onClick={() => authPopup("/google-signin", "Sample Sign In")}
            className={buttonVariants({
              size: "lg",
              className: "mt-5",
            })}
          >
            Get Started
          </Button>
        )}
      </div>
    </>
  );
};

export default BrandingText;
