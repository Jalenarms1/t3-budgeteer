import { Budget } from '@prisma/client';
import React from 'react'
import { getMonthString } from '../../utils/helpers';
import { trpc } from '../../utils/trpc';
import StartBudget from '../StartBudget';
import UserBudget from '../UserBudget';


export default function BudgetHeader() {

    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    const daysLeft = lastDay.getUTCDate() - date.getUTCDate() 

    const {data, isLoading} = trpc.db.getBudget.useQuery()

    console.log(data);
    
    if(isLoading) {
      return null
    }


  return (
    <>
        <div className="h-full pt-10">
          <div className="h-80 ml-10  w-[45%] rounded shadow-sm shadow-slate-500">
            <div className="header-content">
              <div className="flex justify-between border-b border-slate-900 items-center py-2 px-4 rounded rounded-b-none">
                  <p className='text-2xl text-slate-200'>{getMonthString(date.getMonth())}</p>
                  <p className='text-xs text-yellow-400 bg-slate-700 p-1 rounded-md '>{daysLeft} days left</p>
              </div>
              {!data ? <StartBudget month={date.getMonth()} year={date.getFullYear()} /> 
              : <UserBudget data={data as Budget} />
              }
            </div>
          </div>

        </div>
    </>
  )
}
