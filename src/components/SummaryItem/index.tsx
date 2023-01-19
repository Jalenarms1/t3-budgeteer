import { useSession } from 'next-auth/react';
import React from 'react'
import { formatMoney } from '../../utils/helpers'

export default function SummaryItem({data, localData}: {data: any, localData: any}) {
  console.log("data", data);
  const {data:session} = useSession()

  const itemColor = (obj: any) => {
    if(obj.gain) {
      return 'text-green-500'
    } else if(obj.expense){
      return 'text-red-500'
    }
  }
  
  
  if(!data && session) return null
  
  return (
    <>
      { ((localData && localData?.allActivity  && localData?.allActivity.length > 0) || session && data && data?.items) &&  (!session ? localData?.allActivity : data?.items).map((item: any, index: number) => (
        <>
          <div key={index} className={`${itemColor(item)} w-full flex items-center`}>
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
