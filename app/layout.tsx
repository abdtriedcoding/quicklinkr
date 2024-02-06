import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/providers/auth-provider";
import FirebaseAuthProvider from "@/components/providers/firebase-auth-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Toast from "@/components/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quicklinkr",
  description:
    "An application for effortless media uploads, providing secure URLs for seamless sharing and integration.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <Toast />
            {children}
          </FirebaseAuthProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
