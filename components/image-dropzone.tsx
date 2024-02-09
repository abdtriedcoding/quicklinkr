"use client";

import toast from "react-hot-toast";
import DropzoneComponent from "react-dropzone";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/app/actions/uploadFile";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { UserProps } from "@/types";

export default function ImageDropzone({ user }: { user: UserProps }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!session?.user || loading) return;
    try {
      const userRef = doc(db, `users/${user.id}`);
      setLoading(true);
      const toastId = toast.loading("Uploading...");
      let totalSize = 0;
      totalSize = acceptedFiles.reduce((a, v) => (a = a + v.size), 0);
      await Promise.all(
        acceptedFiles.map(async (file) => {
          await uploadFile(file, user);
        })
      );
      await updateDoc(userRef, {
        storageUsed: (user?.storageUsed ?? 0) + totalSize,
      });
      router.refresh();
      toast.success("Uploaded successfully", {
        id: toastId,
      });
    } catch (error) {
      console.error("Error occurred while uploading:", error);
      toast.error("An error occurred while uploading. Please try again later.");
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
