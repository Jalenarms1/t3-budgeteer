import React from 'react'
import { getMonthString } from '../../utils/helpers';
import StartBudget from '../StartBudget';


export default function BudgetHeader() {

    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    const daysLeft = lastDay.getUTCDate() - date.getUTCDate() 
    


  return (
    <>
        <div className="h-full pt-10">
          <div className="h-80 ml-10  w-[45%] rounded shadow-sm shadow-slate-500">
            <div className="header-content">
              <div className="flex justify-between border-b border-white items-center py-2 px-4 rounded rounded-b-none">
                  <p className='text-2xl text-slate-100'>{getMonthString(date.getMonth())}</p>
                  <p className='text-xs text-yellow-400 '>{daysLeft} days left</p>
              </div>
              <StartBudget month={date.getMonth()} year={date.getFullYear()} />
            </div>
          </div>

        </div>
    </>
  )
}
