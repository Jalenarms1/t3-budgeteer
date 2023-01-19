import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useSetGetLocalStorage } from '../../hooks/useLocalStorage';
import { formatMoney } from '../../utils/helpers'

export default function SummaryItem({data, localData}: {data: any, localData: any}) {
  console.log("data", data);
  const {data:session} = useSession()
  const [localGainsExpenses, setLocalGainsExpenses] = useState<any[]>([])
  const {setBudget} = useSetGetLocalStorage()

  const itemColor = (obj: any) => {
    if(obj.gain) {
      return 'text-green-500'
    } else if(obj.expense){
      return 'text-red-500'
    }
  }
  // if(localData ) {
  //   if(localData.gains && localData.gains.length > 1) {
  //     localData.gains.forEach((item: any) => {
  //       setLocalGainsExpenses((prev: any) => {
  //         return [...prev, {
  //           ...item, gain: true
  //         }]
  //       })
  //     })
  //   }

  //   if(localData.expenses && localData.expenses.length > 1) {
  //     localData.expenses.forEach((item: any) => {
  //       setLocalGainsExpenses((prev: any) => {
  //         return [...prev, {
  //           ...item, expense: true
  //         }]
  //       })
  //     })

  //   }

  // }

  console.log("test", localData);
  
  if(!data && session) return null
  
  return (
    <>
      { ((localData && localData?.allActivity  && localData?.allActivity.length > 0) || session && data && data?.items) &&  (!session ? localData?.allActivity : data?.items).map((item: any) => (
        <>
          <div className={`${itemColor(item)} w-full flex items-center`}>
              <div className="text-sm p-2 border-b border-r border-slate-700 w-[60%]">
              <p className="">{item.description}</p>
              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              <p>{formatMoney(item.amount)}</p>

              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              {!session ? (<p>{item.createdAt}</p>) : (<p>{item.createdAt.toLocaleDateString()}</p>)}
              

              </div>

          </div>

        </>
      ))}
    </>
  )
}
