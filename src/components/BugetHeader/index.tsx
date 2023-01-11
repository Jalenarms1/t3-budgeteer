import React from 'react'
import { getMonthString } from '../../utils/helpers';

export default function BudgetHeader() {

    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    const daysLeft = lastDay.getUTCDate() - date.getUTCDate() 
    


  return (
    <>
        <div className="h-full pt-10">
          <div className="h-48 ml-10 bg-slate-800 w-[45%] rounded shadow-sm shadow-slate-700">
            <div className="header-content">
                <div className="flex justify-between shadow-sm shadow-slate-700 items-center py-2 bg-slate-900 px-4 rounded rounded-b-none">
                    <p className='text-2xl  text-yellow-200'>{getMonthString(date.getMonth())}</p>
                    <p className='text-xs text-yellow-200 '>{daysLeft} days left</p>
                </div>
            </div>
          </div>

        </div>
    </>
  )
}
