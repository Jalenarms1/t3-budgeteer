import { Budget } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useSetGetLocalStorage } from '../../hooks/useLocalStorage'
import { trpc } from '../../utils/trpc'
import SummaryItem from '../SummaryItem'

export default function SummaryTable({userBudget}: {userBudget: Budget}) {

    const {data, isLoading} = trpc.db.getGainsAndExpenses.useQuery({budgetId: userBudget?.id})
    console.log("Logged", userBudget);
    console.log("Hello");
    const {data:session} = useSession()
    const {budget} = useSetGetLocalStorage()
    
    
    if(!userBudget && (!session && !budget.total)) return null

  return (
    <>
        <div className="report-table w-[50%] max-sm:w-[100%]">
            <div className="h-full pt-10">
                <div className="h-fit w-[96%] mx-auto rounded shadow-sm shadow-slate-500">
                    <div className="header-content">
                        <div className="flex justify-between border-b bg-slate-900 border-slate-900 items-center py-2 px-4 rounded rounded-b-none">
                        <p className='text-2xl text-slate-200'>Summary</p>
                        
                        </div>
                        <div className="flex flex-wrap w-[100%] text-slate-900 pb-7">
                        <div className="text-sm  w-full flex">
                            <p className="w-[60%] bg-slate-400 p-2 shadow-inner border-b border-slate-800 shadow-slate-800">
                            Description
                            </p>
                            <p className="w-[20%] bg-slate-400 p-2 shadow-inner border-b border-slate-800 shadow-slate-800">
                            Amount
                            </p>
                            <p className="w-[20%] bg-slate-400 p-2 shadow-inner border-b border-slate-800 shadow-slate-800">
                            Date
                            </p>
                        </div>
                        <SummaryItem data={data} localData={budget} />
                        
                        
                        </div>
                
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}
