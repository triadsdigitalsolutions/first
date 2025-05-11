"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/config/firabase";

export default function App() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
     
      await firebaseSignOut(auth);
      await nextAuthSignOut({callbackUrl: "/login",redirect: true});
      
    } catch (e) {}
    
    
  };

  return (
    <Navbar maxWidth="full" className="bg-white shadow-sm" isBordered>
      <NavbarBrand>
        <p className="font-bold ">TRIADS</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                isBordered
                as="span"
                className="transition-transform"
                color="secondary"
                name={session?.user?.name || session?.user?.email || "User"}
                size="sm"
                src={session?.user?.image || "https://i.pravatar.cc/150?u=default"}
              />
              <span className="text-sm text-gray-700 max-w-[140px] truncate">
                {session?.user?.email || "user@email.com"}
              </span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
