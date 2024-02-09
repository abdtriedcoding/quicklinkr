import { db, storage } from "@/firebase/firebase-config";
import {
  writeBatch,
  doc,
  getDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from "next-auth";

export const uploadFile = async (selectedFile: File, user: User) => {
  const batch = writeBatch(db);
  try {
    if (!user) return;
    const userRef = doc(db, `users/${user.id}`);
    // const userDoc = await getDoc(userRef);

    // // Calculate the new storageUsed by adding the size of the selected file
    // const storageUsed = userDoc?.data()?.storageUsed;
    // const newSize =
    //   storageUsed !== undefined
    //     ? storageUsed + selectedFile.size
    //     : selectedFile.size;

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

    // batch.update(userRef, { storageUsed: newSize });
    await batch.commit();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
