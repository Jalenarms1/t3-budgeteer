import { signIn } from 'next-auth/react'
import React from 'react'
import {FcGoogle} from "react-icons/fc/index"

export default function Login() {
  return (
    <>
        <div className='w-full pt-20 flex flex-col gap-8 items-center text-white'>
            <p className="text-2xl text-center">
                Secure your budget
            </p>
            <button onClick={() => signIn("google")} className='flex justify-center rounded-full bg-green-300 hover:bg-green-200 active:bg-green-300 w-1/2 p-2 text-black'>
                <div className='flex gap-2 items-center'>
                    <p>Sign In with Google</p>
                    <FcGoogle className='text-2xl'/>
                </div>
                </button>
        </div>
    </>
  )
}
