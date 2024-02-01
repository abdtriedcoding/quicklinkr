import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import { adminAuth } from "@/firebase/firebase-admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
