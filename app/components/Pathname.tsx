'use client'
import { usePathname } from "next/navigation";
import NavBar from "../NavBar";

import React from 'react'

const pathname = () => {

  const pathname = usePathname();




  return (
    <div>
      {pathname !== '/signIn' && <NavBar />}
    </div>
  )
}

export default pathname