import { Budget } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, {useState} from 'react'
import { useSetGetLocalStorage } from '../../hooks/useLocalStorage'
import AddExpense from '../AddExpense'
import AddGain from '../AddGain'

export default function SpendingActivity({userBudget}: {userBudget: Budget}) {

    const [showGain, setShowGain] = useState<boolean>(true)
    const [record, setRecord] = useState({description: '', amount: 0})
    console.log(record);
    const {budget} = useSetGetLocalStorage()
    const {data:session} = useSession()
    

    const switchShow = () => {
        return setShowGain(!showGain)
    }

    const clearRecord = () => {
        setRecord((prev: any) => {
            return {
                description: '',
                amount: 0
            }
        })
    }

    const recordInputChange = (e: any) => {
        // if(!parseInt(value.slice(-1))) return;
        if(e.target) {
            const {name, value} = e.target
            if(name !== "description" && !parseInt(value.slice(-1)) && value.slice(-1) !== '' && parseInt(value.slice(-1)) !== 0) {
                setRecord((prev) => {
                    return {
                        ...prev
                    }
                })
                return
            } 
            setRecord(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })

        }
    }

    if((session && !userBudget) || (!session && !budget.total)) return null

  return (
    <>
        <div className="h-full pt-10">
          <div className="h-80 w-[96%] mx-auto bg-slate-800 rounded shadow-sm shadow-slate-500">
            <div className="header-content">
                {showGain ? <AddGain clearRecord={clearRecord} userBudget={userBudget} record={record} setRecord={recordInputChange} setShowGain={switchShow}  /> : <AddExpense clearRecord={clearRecord} userBudget={userBudget} record={record} setRecord={recordInputChange} setShowGain={switchShow} />}
              
            </div>
          </div>

        </div>
    </>
  )
}
