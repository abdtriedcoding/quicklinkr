"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import UserMenu from "@/components/user-menu";
import SignIn from "@/components/navbar/signin";
import GetStarted from "@/components/navbar/get-started";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>quicklinkr.</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <SignIn />
                <GetStarted />
              </>
            ) : (
              <>
                {pathname !== "/dashboard" && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Dashboard
                  </Link>
                )}
                <UserMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
