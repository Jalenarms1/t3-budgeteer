import type { Budget } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { MdMoneyOffCsred } from 'react-icons/md/index'
import { useSetGetLocalStorage } from '../../hooks/useLocalStorage'
import { formatMoney } from '../../utils/helpers'
import { trpc } from '../../utils/trpc'

export default function AddExpense({setShowGain, record, setRecord, userBudget, clearRecord} : {setShowGain: () => void, record: {description: string, amount: number}, setRecord: (e: any) => void, userBudget: Budget, clearRecord: () => void}) {
  const ctx = trpc.useContext()
  const expense = trpc.db.addExpense.useMutation({onSuccess: () => ctx.invalidate()})
  const [error, setError] = useState<boolean>(false)
  const {addExpense, setBudget} = useSetGetLocalStorage();
  const {data:session} = useSession()
  

  const submitExpense = () => {
    if(record.amount > 0 && record.description.trim() !== '') {
        expense.mutate({
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

  const submitDemoExpense = () => {
    addExpense(record.description, parseInt(record.amount as any))

    // setBudget((prev: any) => {
    //     return {
    //         ...prev,
    //         spent: prev.spent + parseInt(record.amount as any),
    //     }
    // })

    clearRecord()
  }


  return (
    <>
        <div className="flex justify-between border-b bg-slate-900 border-slate-900 items-center py-2 px-4 rounded rounded-b-none">
            
            <p className='text-2xl text-slate-200'>Add Gain / Expense</p>
            <MdMoneyOffCsred className='text-2xl text-red-500' />
        </div>
        <div className='flex flex-col gap-2'>
            <div className="flex justify-between py-2 m-3">
                <div className='flex items-center gap-3'>
                    <p className='text-xl border-b border-slate-600 w-fit    text-slate-100'>Expense</p>
                    <p onClick={setShowGain} className='text-xs text-slate-400 cursor-pointer'>/ Gain</p>

                </div>
                <button onClick={!session ? submitDemoExpense : submitExpense} className="px-3 bg-red-200 text-slate-900 rounded font-semibold active:bg-red-400 hover:bg-red-300">Add</button>
            </div>
            <div className="flex flex-col gap-2 mx-3">
                <p className="text-xs text-slate-100">Description</p>
                <div className='flex gap-2'>
                    
                    <input value={record.description} onChange={setRecord} name='description' type="text" className='w-[70%] rounded p-1 ' />
                    
                </div>
                <p className="text-xs text-slate-100 mt-2">Amount</p>
                <div className='flex gap-1 text-white'>
                    <input value={record.amount} onChange={setRecord} name='amount' type="text" className=" rounded-sm w-20 text-right  text-black pr-2" />
                    <p className='text-red-500'>{formatMoney(record.amount)}</p>
                </div>

            </div>
        </div>
    </>
  )
}
