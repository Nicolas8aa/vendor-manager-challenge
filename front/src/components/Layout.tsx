import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

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
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          App
        </Link>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/">Aggreements</Link>
          </li>
          <li>
            <Link href="/about">Balance</Link>
          </li>
          <li>
            <Link href="/contact">Admin</Link>
          </li>
          <li>
            <Link href="#" onClick={() => signOut()}>
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
      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </>
  );
};

export default Layout;
