'use client'
import { usePathname } from "next/navigation";
import NavBar from "../NavBar";

import React from 'react'

const Pathname = () => {

  const pathname = usePathname();

  const noNavRoutes = ['/auth/signin', '/auth/signup', '/auth/reset-password', 'not-found'];

  // Handle no Navbar for 404 page and all routes in noNavRoutes
  const shouldRenderNavbar = !noNavRoutes.includes(pathname) && pathname !== '/_error' && !pathname.includes('/_error');




  return (
    <div>
      {shouldRenderNavbar && <NavBar />}
    </div>
  )
}

export default Pathname