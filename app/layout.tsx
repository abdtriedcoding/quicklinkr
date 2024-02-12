import "./globals.css";
import { Open_Sans } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { constructMetadata } from "@/lib/utils";
import SessionProvider from "@/components/providers/auth-provider";
import FirebaseAuthProvider from "@/components/providers/firebase-auth-provider";
import Navbar from "@/components/navbar";
import Toast from "@/components/toast";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = constructMetadata();

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
            <Navbar />
            {children}
          </FirebaseAuthProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
