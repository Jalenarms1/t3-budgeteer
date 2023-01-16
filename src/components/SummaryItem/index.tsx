import React from 'react'
import { formatMoney } from '../../utils/helpers'

export default function SummaryItem({data}: {data: any}) {
  console.log("data", data);

  const itemColor = (obj: any) => {
    if(obj.gain) {
      return 'text-green-500'
    } else if(obj.expense){
      return 'text-red-500'
    }
  }
  
  return (
    <>
      {data?.items.map((item: any) => (
        <>
          <div className={`${itemColor(item)} w-full flex items-center`}>
              <div className="text-sm p-2 border-b border-r border-slate-700 w-[60%]">
              <p className="">{item.description}</p>
              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              <p>{formatMoney(item.amount)}</p>

              </div>
              <div className="border-b border-r text-sm border-slate-700 p-2 w-[20%]">
              <p>{item.createdAt.toLocaleDateString("en-US")}</p>

              </div>

          </div>

        </>
      ))}
    </>
  )
}