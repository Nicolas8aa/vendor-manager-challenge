import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";

const AdminDropdown = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <p className="cursor-pointer">Admin</p>
        {/* <Button variant="flat">Admin</Button> */}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => router.replace(`/admin/${key}`)}
      >
        <DropdownItem key="best-buyer-profession">
          Best buyer profession
        </DropdownItem>
        <DropdownItem key="best-buyers">Best buyers</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const AppNavbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-indigo-600 p-4 sticky top-0 z-10">
      <div className="container mx-auto text-white flex justify-between items-center">
        <Link href="/" className=" font-bold text-lg">
          Vendor manager
        </Link>
        <ul className="flex space-x-8  items-center">
          <li>
            <Link href="/agreements">Aggreements</Link>
          </li>
          <li>
            <Link href="/submissions">Submissions</Link>
          </li>
          <li>
            <Link href="/balance">Balance</Link>
          </li>

          {session?.user.admin && <AdminDropdown />}
        </ul>
        <Link href="#" onClick={() => signOut()}>
          Log out
        </Link>
      </div>
    </nav>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppNavbar />
      <main className="max-w-5xl mx-auto pt-8 min-h-screen ">{children}</main>
    </>
  );
};

export default Layout;
