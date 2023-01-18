import type { Budget } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { formatMoney } from '../../utils/helpers'

export default function UserBudget({data, localBudget}: {data: Budget, localBudget: any}) {
    const {data:session} = useSession()

    const currBudget = session ? data : localBudget

    const progressControl = (prop: any) => {
        if(currBudget.spent / prop > .75 && currBudget.spent < prop) return 'text-yellow-500'
        if(currBudget.spent > prop) return 'text-red-500'
        if(currBudget.spent < prop) return 'text-green-500'
    }
    
  return (
    <div className="flex flex-col gap-1 justify-center items-center  shadow-inner shadow-slate-900 h-fit pb-12">
        <p className="text-2xl text-slate-200 mt-2">Current Budget</p>
        <div className={`flex w-[95%] p-3 mt-5 justify-between gap-2 ${progressControl(currBudget.total)} shadow-sm shadow-slate-500`}>
            <p>Total Budget:</p>
            <div className="flex items-center gap-2 ">
                <p>{formatMoney(currBudget.spent)}</p>
                <p className='text-xs text-slate-400'>/ {formatMoney(currBudget.total)}</p>

            </div>
        </div>
        <div className="progress-wrap w-[95%] relative my-2">
            <div className="absolute h-3 border border-slate-200 w-[100%] rounded-lg"></div>
            <div className="absolute h-3 bg-slate-200 w-[0%] rounded-lg" style={{width: `${currBudget.spent < currBudget.total ? (currBudget.spent / currBudget.total * 100) : 100}%`}}></div>
        </div>
        <div className={`flex w-[95%] p-3 mt-5 justify-between gap-2 ${progressControl(currBudget.strict)} shadow-sm shadow-slate-500`}>
            <p>Strict Budget:</p>
            <div className="flex items-center gap-2 ">
                <p>{formatMoney(currBudget.spent)}</p>
                <p className='text-xs text-slate-400'>/ {formatMoney(currBudget.strict)}</p>

            </div>

        </div>
        <div className="progress-wrap w-[95%] relative my-2">
            <div className="absolute h-3 border border-slate-200 w-[100%] rounded-lg"></div>
            <div className={`absolute h-3 bg-slate-200 rounded-lg`} style={{width: `${currBudget.spent < currBudget.strict ? (currBudget.spent / currBudget.strict * 100) : 100}%`}}></div>
        </div>
    </div>
  )
}
