import ImageDropzone from "@/components/image-dropzone";
import getCurrentUser from "@/app/actions/getCurrentUser";

import { redirect } from "next/navigation";
import { getAllFiles } from "@/app/actions/getAllFiles";
import { columns } from "@/app/(dashboard)/_components/columns";
import { DataTable } from "@/app/(dashboard)/_components/data-table";

const DashBoardPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  const files = await getAllFiles(user);
  return (
    <div className="space-y-5">
      <ImageDropzone user={user} />
      <DataTable columns={columns} data={files} />
    </div>
  );
};

export default DashBoardPage;
