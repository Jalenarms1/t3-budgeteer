import type { Budget } from '@prisma/client'
import React, { useState } from 'react'
import {MdAttachMoney} from "react-icons/md/index"
import { formatMoney } from '../../utils/helpers'
import { trpc } from '../../utils/trpc'


export default function AddGain({setShowGain, record, setRecord, userBudget, clearRecord} : {setShowGain: () => void, record: {description: string, amount: number}, setRecord: (e: any) => void, userBudget: Budget, clearRecord: () => void}) {
  const ctx = trpc.useContext()
  const gain = trpc.db.addGain.useMutation({onSuccess: () => ctx.invalidate()})
  const [error, setError] = useState<boolean>(false)
  console.log(error);
  

  const submitGain = () => {
    if(record.amount > 0 && record.description.trim() !== '') {
        gain.mutate({
            amount: parseInt(record.amount as any),
            description: record.description,
            budgetId: userBudget.id
        })

        clearRecord()

        setError(false)
    } else {
        setError(true)
    }
  }

  return (
    <>
        <div className="flex justify-between border-b bg-slate-900 border-slate-900 items-center py-2 px-4 rounded rounded-b-none">
            
            <p className='text-2xl text-slate-200'>Add Gain / Expense</p>
            <MdAttachMoney className='text-2xl text-green-500' />
        </div>
        <div className='flex flex-col gap-2'>
            <div className="flex justify-between py-2 m-3">
                <div className='flex items-center gap-3'>
                    <p className='text-xl border-b border-slate-600 w-fit text-slate-100'>Gain</p>
                    <p onClick={setShowGain} className='text-xs text-slate-400 cursor-pointer'>/ Expense</p>

                </div>
                <button onClick={submitGain} className="px-3 bg-green-200 text-slate-900 rounded font-semibold active:bg-green-400 hover:bg-green-300">Add</button>
            </div>
            <div className="flex flex-col gap-2 mx-3">
                <p className="text-xs text-slate-100">Description</p>
                <div className='flex gap-2'>
                    
                    <input onChange={setRecord} value={record.description} name='description'  type="text" className='w-[70%] rounded p-1 ' />
                    
                </div>
                <p className="text-xs text-slate-100 mt-2">Amount</p>
                <div className='flex gap-1 text-white'>
                    <input value={record.amount} onChange={setRecord} name='amount' type="text" className=" rounded-sm w-20 text-right  text-black pr-2" />
                    <p className='text-green-500'>{formatMoney(record.amount)}</p>
                </div>

            </div>
        </div>
    </>
  )
}
