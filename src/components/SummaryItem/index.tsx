import { useSession } from 'next-auth/react';
import React from 'react'
import { formatMoney } from '../../utils/helpers'

export default function SummaryItem({data, localData}: {data: any, localData: any}) {
  console.log("data", data);
  const {data:session} = useSession()
  const localGainsExpenses: any[] = []

  const itemColor = (obj: any) => {
    if(obj.gain) {
      return 'text-green-500'
    } else if(obj.expense){
      return 'text-red-500'
    }
  }
  if(localData) {

    localData.gains.forEach((item: any) => {
      localGainsExpenses.push({...item, gain: true})
    })

    localData.expenses.forEach((item: any) => {
      localGainsExpenses.push({...item, expense: true})
    })

  }
  console.log("local", localGainsExpenses);
  
  
  return (
    <>
      {localGainsExpenses.length > 1 && localGainsExpenses[0] && (!session ? localGainsExpenses : data?.items).map((item: any) => (
        <>
          <div className={`${itemColor(item)} w-full flex items-center`}>
              <div className="text-sm p-2 border-b border-r border-slate-700 w-[60%]">
              <p className="">{item.description}</p>
              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              <p>{formatMoney(item.amount)}</p>

              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              {localData ? <p>{item.createdAt}</p> : <p>{item.createdAt.toLocaleDateString()}</p>}
              

              </div>

          </div>

        </>
      ))}
    </>
  )
}
