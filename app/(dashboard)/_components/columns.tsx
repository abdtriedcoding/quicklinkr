"use client";

import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { ColumnDef } from "@tanstack/react-table";
import { COLOR_EXTENSION_MAP } from "@/constant";
import { FileIcon, defaultStyles } from "react-file-icon";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";
import CopyButton from "@/components/copy-button";
import EditButton from "@/components/edit-button";

export type FileType = {
  id: string;
  type: string;
  filename: string;
  createdAt: string;
  size: number;
  downloadURL: string;
};

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type?.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            {...defaultStyles.docx}
            labelColor={COLOR_EXTENSION_MAP[extension]} // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "createdAt",
    cell: ({ renderValue, ...props }) => {
      return <span className="pl-4">{renderValue() as string}</span>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <Link
          download
          href={renderValue() as string}
          target="_blank"
          className="underline cursor-pointer text-blue-500 hover:text-blue-600"
        >
          Download
        </Link>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="flex space-x-2 items-center">
          <CopyButton downloadURL={file.downloadURL} />
          <DeleteButton id={file.id} size={file.size} />
          <EditButton id={file.id} />
        </div>
      );
    },
  },
];
