"use client"

import { usePathname } from "next/navigation";
import { Navbar as Navbarwindow } from "./navbar";
import React from 'react'

function NavbarMenu() {
    const path=usePathname()
    const isDashboard = path.startsWith('/dashboard');
  return (
    <>
    {isDashboard ? <> </>:<Navbarwindow />}
    </>
  )
}

export default NavbarMenu