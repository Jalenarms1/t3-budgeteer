import React from 'react'
import Image from "next/image";
import {BsFillCalculatorFill} from "react-icons/bs/index"
import { signOut, useSession } from 'next-auth/react';
import {FcMoneyTransfer} from "react-icons/fc/index"

export default function NavBar() {
  const {data:session} = useSession()
  return (
    <>
        <nav className="h-fit bg-slate-900 w-full shadow-sm shadow-slate-600">
          <div className="flex justify-between items-center w-[100%]  px-4">
            <div className='flex items-center gap-3 p-3'>
              {/* <Image src={"/images/budgeteer_logo.png"} alt={"logo"} width={50} height={50} className="py-2" /> */}
              <FcMoneyTransfer className='text-3xl ' />
              <p className="text-3xl text-green-500 logo-font">Budgeteer</p>

            </div>
            <div className='flex items-center gap-4'>
              <BsFillCalculatorFill className='text-green-500 text-3xl  rounded active:text-green-600 cursor-pointer hover:text-green-400' />
              {session && <button onClick={() => signOut()} className='text-yellow-400 shadow-sm shadow-red-700 active:bg-slate-800  p-2'>
                Logout
              </button>}

            </div>
          </div>

        </nav>
    </>
  )
}
