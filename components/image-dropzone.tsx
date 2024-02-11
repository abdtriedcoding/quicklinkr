"use client";

import toast from "react-hot-toast";
import DropzoneComponent from "react-dropzone";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserProps } from "@/types";

import { db } from "@/firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFile } from "@/app/actions/uploadFile";

export default function ImageDropzone({ user }: { user: UserProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!user || loading) return;
    const userRef = doc(db, `users/${user.id}`);
    const toastId = toast.loading("Uploading...");

    try {
      setLoading(true);

      // Calculate the total file size
      const totalFileSize = acceptedFiles.reduce(
        (acc, file) => acc + file.size,
        0
      );

      // Upload all files concurrently
      await Promise.all(
        acceptedFiles.map(async (file) => {
          await uploadFile(file, user);
        })
      );

      // Update user document with the new storage used
      await updateDoc(userRef, {
        storageUsed: (user?.storageUsed ?? 0) + totalFileSize,
      });

      // Refresh the router
      router.refresh();
      toast.success("Uploaded successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropzoneComponent disabled={loading} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
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
          </>
        );
      }}
    </DropzoneComponent>
  );
}
