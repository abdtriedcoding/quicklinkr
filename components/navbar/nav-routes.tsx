"use client";

import Link from "next/link";
import UserMenu from "../user-menu";
import prettyBytes from "pretty-bytes";
import { usePathname } from "next/navigation";

import { UserProps } from "@/types";
import { authPopup } from "@/lib/auth-popup";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";

const NavRoutes = ({ user }: { user: UserProps }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const storageUsedPercentage = (user?.storageUsed ?? 0) / (1 * 1000 * 1000);

  return (
    <>
      {!session?.user ? (
        <Button
          onClick={() => authPopup("/google-signin", "Sample Sign In")}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          Sign in
        </Button>
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
          {pathname !== "/" && (
            <div className="flex flex-col items-center space-y-1 text-xs whitespace-nowrap">
              <p>{prettyBytes(user?.storageUsed ?? 0)} / 100 MB</p>
              <Progress value={storageUsedPercentage} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NavRoutes;
