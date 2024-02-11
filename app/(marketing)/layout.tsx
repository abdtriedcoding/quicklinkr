// import Footer from "./_components/footer";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-4">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
