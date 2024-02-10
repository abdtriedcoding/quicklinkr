import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Toast from "@/components/toast";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/providers/auth-provider";
import FirebaseAuthProvider from "@/components/providers/firebase-auth-provider";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

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
        <body className={openSans.className}>
          <FirebaseAuthProvider>
            <Toast />
            {children}
          </FirebaseAuthProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
