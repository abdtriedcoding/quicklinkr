"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import UserMenu from "@/components/user-menu";
import SignIn from "@/components/navbar/signin";
import GetStarted from "@/components/navbar/get-started";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { UserProps } from "@/types";
import prettyBytes from "pretty-bytes";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProps>();

  const getUser = async () => {
    const docRef = doc(db, `users/${session?.user.id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data() as UserProps);
    }
  };

  useEffect(() => {
    getUser();
  }, [session]);

  const storageUsedPercentage = (user?.storageUsed ?? 0 / (1 * 1024 * 1024 * 1024)) * 100;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="font-semibold">
            <span>quicklinkr.</span>
          </Link>

          <div className="items-center space-x-4 flex">
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
                <div className="flex flex-col items-center space-y-1 text-xs whitespace-nowrap">
                  <p>{prettyBytes(user?.storageUsed ?? 0)} / 1 GB</p>
                  <Progress value={storageUsedPercentage} />
                </div>
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
