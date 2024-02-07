"use client";

import { db, storage } from "@/firebase/firebase-config";
import { cn } from "@/lib/utils";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import toast from "react-hot-toast";

export default function ImageDropzone() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const maxSize = 20971520; //20MB max

  const onDrop = async (acceptedFile: File[]) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadFile(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (selectedFile: File) => {
    if (!session?.user || loading) return;
    setLoading(true);
    const toastId = toast.loading("uploading...");
    const batch = writeBatch(db);

    const userRef = doc(db, "users", session.user.id);
    const userDoc = await getDoc(userRef);

    // Calculate the new storageUsed by adding the size of the selected file
    const storageUsed = userDoc?.data()?.storageUsed;
    const newSize =
      storageUsed !== undefined
        ? storageUsed + selectedFile.size
        : selectedFile.size;

    const newFileData = {
      filename: selectedFile.name,
      createdAt: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
      downloadURL: null,
    };

    const docRef = doc(collection(db, "users", session.user.id, "files"));
    batch.set(docRef, newFileData);
    const imageRef = ref(
      storage,
      `users/${session.user.id}/files/${docRef.id}`
    );
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    batch.update(docRef, { downloadURL });

    batch.update(userRef, { storageUsed: newSize });
    await batch.commit();
    toast.success("Uploaded successfully", {
      id: toastId,
    });
    setLoading(false);
  };

  return (
    <DropzoneComponent
      disabled={loading}
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer",
                isDragActive
                  ? "bg-[#035ffe] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate=800/80 text-slate-400",
                loading && "cursor-not-allowed"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!!"}
            </div>
            {isFileTooLarge && (
              <div className="text-red-500 text-center mt-2">
                File is too large
              </div>
            )}
          </>
        );
      }}
    </DropzoneComponent>
  );
}
