import ImageDropzone from "@/components/image-dropzone";
import { DataTable } from "@/app/(dashboard)/_components/data-table";
import { FileType, columns } from "@/app/(dashboard)/_components/columns";
import { getAllFiles } from "@/app/actions/getAllFiles";
import getCurrentUser from "@/app/actions/getCurrentUser";

const DashBoardPage = async () => {
  const user = await getCurrentUser();
  const data = await getAllFiles(user!);
  console.log(data);
  return (
    <div className="space-y-5">
      <ImageDropzone />
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
};

export default DashBoardPage;
