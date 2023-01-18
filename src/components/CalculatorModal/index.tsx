import React, {type Dispatch, type SetStateAction} from 'react'
import Calculator from '../Calculator'
import {AiOutlineCloseCircle} from 'react-icons/ai/index'

export default function CalculatorModal({setShowCalculator, showCalculator}: {showCalculator: boolean, setShowCalculator: Dispatch<SetStateAction<boolean>>}) {
  return (
    <>
        <div className="w-[100%] flex h-screen z-10 bg-[rgba(0,0,0,0.4)] absolute justify-center mt-28">
            <div className='w-3/5 h-fit bg-slate-400 rounded'>
                <div className="full flex justify-end p-2">
                    <AiOutlineCloseCircle onClick={() => setShowCalculator(!showCalculator)} className='text-xl text-slate-700 cursor-pointer' />
                </div>
                <Calculator />
                <button onClick={() => setShowCalculator(!showCalculator)} className="bg-slate-200 hover:bg-slate-300 active:bg-slate-200 w-full p-1 rounded-b">Close</button>
            </div>
        </div>
    </>
  )
}
