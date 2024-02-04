import ImageDropzone from "@/components/image-dropzone";
import React from "react";
import { Payment, columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";

const DashBoardPage = async () => {
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }, {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
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
