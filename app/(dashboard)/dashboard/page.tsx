import ImageDropzone from "@/components/image-dropzone";
import { DataTable } from "@/app/(dashboard)/_components/data-table";
import { FileType, columns } from "@/app/(dashboard)/_components/columns";

const DashBoardPage = async () => {
  async function getData(): Promise<FileType[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        type: "example_image/jpg",
        filename: "example_image.jpg",
        timestamp: new Date("2024-02-04T12:00:00Z"),
        size: 1024, // Size in bytes
        downloadUrl:
          "https://images.unsplash.com/photo-1682687221175-fd40bbafe6ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        type: "example_video/py",
        filename: "example_video.py",
        timestamp: new Date("2024-02-04T13:30:00Z"),
        size: 2048, // Size in bytes
        downloadUrl:
          "https://images.unsplash.com/photo-1682687221175-fd40bbafe6ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "3",
        type: "example_document/png",
        filename: "example_document.png",
        timestamp: new Date("2024-02-04T14:45:00Z"),
        size: 4096, // Size in bytes
        downloadUrl:
          "https://images.unsplash.com/photo-1682687221175-fd40bbafe6ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];
  }

  // Fetch data from your API here.
  const data = await getData();

  return (
    <div className="space-y-5">
      <ImageDropzone />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashBoardPage;
