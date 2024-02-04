"use client";

import { cn } from "@/lib/utils";
import DropzoneComponent from "react-dropzone";

export default function ImageDropzone() {
  const maxSize = 20971520; //20MB max

  const onDrop = (acceptedFile: File[]) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await console.log(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
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
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer",
                isDragActive
                  ? "bg-[#035ffe] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate=800/80 text-slate-400"
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
          </section>
        );
      }}
    </DropzoneComponent>
  );
}
