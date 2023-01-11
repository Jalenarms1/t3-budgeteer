import React from 'react'
import Image from "next/image";

export default function NavBar() {
  return (
    <>
        <nav className="h-fit bg-slate-900 w-full shadow-sm shadow-slate-600">
          <div className="flex gap-3 items-center w-fit cursor-pointer ml-3">
            <Image src={"/images/budgeteer_logo.png"} alt={"logo"} width={50} height={50} className="py-2" />
            <p className="text-3xl text-green-500 logo-font">Budgeteer</p>
          </div>

        </nav>
    </>
  )
}
