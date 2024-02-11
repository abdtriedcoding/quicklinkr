export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="max-w-6xl mx-auto pt-20 pb-4">{children}</main>
    </>
  );
}
