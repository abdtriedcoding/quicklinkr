import Link from "next/link";
import NavRoutes from "./nav-routes";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-30 w-full bg-white/75 backdrop-blur-lg transition-all border-b border-zinc-200">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
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
