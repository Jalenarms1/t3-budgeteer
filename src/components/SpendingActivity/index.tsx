import { Budget } from '@prisma/client'
import React, {useState} from 'react'
import AddExpense from '../AddExpense'
import AddGain from '../AddGain'

export default function SpendingActivity({userBudget}: {userBudget: Budget}) {

    const [showGain, setShowGain] = useState<boolean>(true)
    const [record, setRecord] = useState({description: '', amount: 0})
    console.log(record);
    

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



  return (
    <>
        <div className="h-full pt-10">
          <div className="h-80 ml-10 bg-slate-800  w-[100%] rounded shadow-sm shadow-slate-500">
            <div className="header-content">
                {showGain ? <AddGain clearRecord={clearRecord} userBudget={userBudget} record={record} setRecord={recordInputChange} setShowGain={switchShow}  /> : <AddExpense clearRecord={clearRecord} userBudget={userBudget} record={record} setRecord={recordInputChange} setShowGain={switchShow} />}
              
            </div>
          </div>

        </div>
    </>
  )
}
