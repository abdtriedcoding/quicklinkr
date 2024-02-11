import Navbar from "@/components/navbar";
// import Footer from "./_components/footer";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
