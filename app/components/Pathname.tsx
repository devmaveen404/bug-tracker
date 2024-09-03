'use client'
import { usePathname } from "next/navigation";
import NavBar from "../NavBar";

import React from 'react'

const Pathname = () => {

  const pathname = usePathname();

  const noNavRoutes = ['/auth/signIn', '/auth/request-reset', '/auth/reset-password', '/auth/signout', 'not-found'];

  // Handle and all routes in noNavRoutes
  const shouldRenderNavbar = !noNavRoutes.includes(pathname)




  return (
    <div>
      {shouldRenderNavbar && <NavBar />}
    </div>
  )
}

export default Pathname