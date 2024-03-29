import { UserProps } from "@/types";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FileType } from "@/app/(dashboard)/_components/columns";

export const getAllFiles = async (user: UserProps) => {
  const collectionRef = collection(db, `users/${user.id}/files`);

  try {
    const querySnapshot = await getDocs(
      query(collectionRef, orderBy("createdAt", "desc"))
    );
    const files: FileType[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: new Date(data.createdAt.seconds * 1000).toLocaleDateString(),
      } as FileType;
    });

    return files;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw new Error("Failed to retrieve files");
  }
};
