import { db } from "@/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { User } from "next-auth";
import { FileType } from "../(dashboard)/_components/columns";
import { UserProps } from "@/types";

export const getAllFiles = async (user: UserProps) => {
  if (!user) {
    throw new Error("Not authenticated");
  }

  const collectionRef = collection(db, `users/${user.id}/files`);

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents: FileType[] = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() } as FileType);
    });

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};
