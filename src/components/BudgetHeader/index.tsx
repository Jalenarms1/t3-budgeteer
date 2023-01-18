import type { Budget } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useSetGetLocalStorage } from '../../hooks/useLocalStorage';
import { getMonthString } from '../../utils/helpers';
import { trpc } from '../../utils/trpc';
import StartBudget from '../StartBudget';
import UserBudget from '../UserBudget';


export default function BudgetHeader({userBudget}: {userBudget: Budget}) {
  const {data:session} = useSession()

    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    const daysLeft = lastDay.getUTCDate() - date.getUTCDate() 
    const {budget} = useSetGetLocalStorage()
    console.log(budget.total);
    


    // const {data, isLoading} = trpc.db.getBudget.useQuery()

    // console.log(data);
    
    // if(isLoading) {
    //   return null
    // }


  return (
    <>
        <div className="h-full pt-10">
          <div className="h-80 bg-slate-800 w-[96%] mx-auto rounded shadow-sm shadow-slate-500">
            <div className="header-content">
              <div className="flex justify-between border-b bg-slate-900 border-slate-900 items-center py-2 px-4 rounded rounded-b-none">
                  <p className='text-2xl text-slate-200'>{getMonthString(date.getMonth())}</p>
                  <p className='text-xs text-yellow-400 bg-slate-700 p-1 rounded-md '>{daysLeft} days left</p>
              </div>
              {((!session && !budget.total) || ( session && !userBudget)) ? <StartBudget month={date.getMonth()} year={date.getFullYear()} /> 
              : <UserBudget data={userBudget as Budget} localBudget={budget} />
              }
            </div>
          </div>

        </div>
    </>
  )
}
