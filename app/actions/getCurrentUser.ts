import { getServerSession } from "next-auth";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { UserProps } from "@/types";
import { authOptions } from "@/lib/auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return null;
    }

    const userDocRef = doc(db, `users/${session.user.id}`);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      return null;
    }

    const currentUser = userDocSnapshot.data();

    return {
      ...currentUser,
      id: session?.user?.id,
    } as UserProps;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
