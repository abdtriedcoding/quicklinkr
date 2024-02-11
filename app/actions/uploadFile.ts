import { User } from "next-auth";
import { db, storage } from "@/firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  writeBatch,
  doc,
  serverTimestamp,
  collection,
  getDoc,
} from "firebase/firestore";
import { UserProps } from "@/types";

export const uploadFile = async (selectedFile: File, user: User) => {
  const batch = writeBatch(db);
  try {
    if (!user) return;
    const userDocRef = doc(db, `users/${user.id}`);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() as UserProps;
    const storageUsed = userData?.storageUsed ?? 0;
    if (storageUsed > 100000000) {
      throw new Error("STORAGE_FULL");
    }
    const newFileData = {
      filename: selectedFile.name,
      createdAt: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
      downloadURL: null,
    };

    const fileDocRef = doc(collection(db, "users", user.id, "files"));
    batch.set(fileDocRef, newFileData);
    const fileStorageRef = ref(
      storage,
      `users/${user.id}/files/${fileDocRef.id}`
    );
    await uploadBytes(fileStorageRef, selectedFile);
    const downloadURL = await getDownloadURL(fileStorageRef);
    batch.update(fileDocRef, { downloadURL });

    await batch.commit();
  } catch (error: any) {
    if (error.message === "STORAGE_FULL") {
      throw new Error("Your storage is full. Please free up some space.");
    } else {
      throw new Error("Failed to upload files");
    }
  }
};
