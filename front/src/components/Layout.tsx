import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="text-white font-bold text-lg">
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-indigo-600 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          Vendor manager
        </Link>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/agreements">Aggreements</Link>
          </li>
          <li>
            <Link href="/submissions">Submissions</Link>
          </li>
          <li>
            <Link href="/balance">Balance</Link>
          </li>

          {session?.user.admin && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}

          <li>
            <Link href="#" className="text-black" onClick={() => signOut()}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-8 min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
