import { User } from "next-auth";
import { db, storage } from "@/firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  writeBatch,
  doc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

export const uploadFile = async (selectedFile: File, user: User) => {
  const batch = writeBatch(db);
  try {
    if (!user) return;

    const newFileData = {
      filename: selectedFile.name,
      createdAt: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
      downloadURL: null,
    };

    const docRef = doc(collection(db, "users", user.id, "files"));
    batch.set(docRef, newFileData);
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    batch.update(docRef, { downloadURL });

    await batch.commit();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload files");
  }
};
