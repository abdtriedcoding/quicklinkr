import Link from "next/link";
import NavRoutes from "./nav-routes";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="font-semibold">
            <span>quicklinkr.</span>
          </Link>

          <div className="items-center space-x-4 flex">
            <NavRoutes user={user!} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
