import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'

interface TBudget {
    total: number | string,
    strict: number | string,
    month: number,
    year: number,
    spent: number,
    error: boolean

} 

const numRef = [0,1,2,3,4,5,6,7,8,9]

export default function StartBudget({month, year}: {month: number, year: number}) {
    
    const [state, setState] = useState<TBudget>({total: 0, strict: 0, month, year, spent: 0, error: false })
    const starter = trpc.db.startBudget.useMutation({onSuccess: () => ctx.invalidate()})
    const ctx = trpc.useContext()

    const submitBudget = () => {
        if((state.total && state.strict) > 0){
            starter.mutate({month, year, total: parseInt(state.total as string), strict: parseInt(state.strict as string), spent: state.spent})
            setState((prev: TBudget) => {
                return {
                    ...prev,
                    error: false
                }
            })
            return

        }else {
            setState((prev: TBudget) => {
                return {
                    ...prev,
                    error: true
                }
            })
        }

    }

    const inputChange = (e: any) => {
        const {name, value} = e.target
        
        if(value === 0) setState((prev: TBudget) => {
            return {
                ...prev,
                [name]: value
            }
        })
        
        if(!parseInt(value.slice(-1)) && value.slice(-1) !== '' && parseInt(value.slice(-1)) !== 0) {
            setState((prev: TBudget) => {
                return {
                    ...prev
                }
            })
            return
        } 

        

        setState((prev: TBudget) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

  return (
    <div className="flex flex-col justify-center items-center ">
        <div className='flex  gap-2'>
            <div className="flex flex-col gap-8 my-5 py-2 px-2 shadow-sm shadow-slate-600  rounded">
                <div className="flex gap-4 text-slate-100 ">
                    <p>Total Budget: </p>
                    <div>
                        <span className='text-green-700 '>$</span> <input name='total' onChange={inputChange} value={state.total} type="text" className=" rounded-sm w-20 text-right text-black pr-2" /> <span className='text-slate-100 '>.00</span>
                    
                    </div>
                    
                    
                </div>
                <div className="flex gap-4 text-slate-100">
                    <p>Strict Budget: </p>
                    <div>
                        <span className='text-green-700 '>$</span> <input name='strict' onChange={inputChange} value={state.strict} type="text" className="text-right text-black pr-2 rounded-sm w-20" /> <span className='text-slate-100 '>.00</span>

                    </div>

                </div>
                <button onClick={submitBudget} className="bg-yellow-400 rounded active:bg-yellow-600 hover:bg-yellow-500 shadow-sm shadow-slate-900 text-slate-900 px-3 py-1 font-semibold">Start Budget</button>
            </div>

        </div>
    </div>
  )
}
