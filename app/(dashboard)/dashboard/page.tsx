import ImageDropzone from "@/components/image-dropzone";
import { DataTable } from "@/app/(dashboard)/_components/data-table";
import { columns } from "@/app/(dashboard)/_components/columns";
import { getAllFiles } from "@/app/actions/getAllFiles";
import getCurrentUser from "@/app/actions/getCurrentUser";

const DashBoardPage = async () => {
  const user = await getCurrentUser();
  const files = await getAllFiles(user!);
  return (
    <div className="space-y-5">
      <ImageDropzone />
      <DataTable columns={columns} data={files} />
    </div>
  );
};

export default DashBoardPage;
