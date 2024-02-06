import Navbar from "@/components/navbar";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </>
  );
}
