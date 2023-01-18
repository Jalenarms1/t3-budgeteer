import React,{useState} from "react";
// import './Calculator.css'

export default function Calculator(){

    const [acc , setAcc] = useState('')
    const [total , setTotal] = useState('')

    function ClearAll(){
        setTotal('')
        setAcc('')
    }
    function AddNumber(num: string){
        if(total === '' && num === '0') return;
        if(total.length <= 8){
            setTotal(total + num) 
        }
    }
    function AddAction(sinal: string){
        if(total == ''){
           return 
        }
        else if(total.split('')[total.length - 1] == '.'){
            setAcc(acc + total + '0' + ` ${sinal} `)
            setTotal('')
        }
        else{
            setAcc(acc + total + ` ${sinal} `)
            setTotal('')
        }
    }
    function AddDot(){
        if(total.length == 0){
            setTotal('0.')
        }
        else if(total.split('')[total.length - 1] == '.'){
            return
        }
        else{
            setTotal(total + '.')
        }
    }
    const delLast = () => {
        setTotal(total.slice(0, total.length - 1))
    }
    function Result(){
        let result = String(acc + total).replace('÷' , '/').replace('x' , '*')
        result = String(eval(result)).substring(0 , 9)
        setTotal(result)
        setAcc('')
    }

    return(
        <div className="calculator flex flex-col w-full px-5 py-2 pb-8">
            <div className="visor flex flex-col items-center rounded-t text-white border border-slate-700 bg-slate-900 h-16 w-full p-1">
                <div className="acc flex justify-end items-end w-[97%] text-slate-400">{acc}</div>
                <div className="total flex justify-end items-end w-[97%]">{total}</div>
            </div>
            <div className="container flex flex-wrap w-full">
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="C" onClick={() => setTotal('')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="CE" onClick={() => ClearAll()}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="Del" onClick={() => delLast()}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="x" onClick={() => AddAction('x')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="7" onClick={() => AddNumber('7')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="8" onClick={() => AddNumber('8')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="9" onClick={() => AddNumber('9')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="-" onClick={() => AddAction('-')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="4" onClick={() => AddNumber('4')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="5" onClick={() => AddNumber('5')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="6" onClick={() => AddNumber('6')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="+" onClick={() => AddAction('+')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="1" onClick={() => AddNumber('1')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="2" onClick={() => AddNumber('2')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="3" onClick={() => AddNumber('3')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] action" value="÷" onClick={() => AddAction('÷')}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%]" value="." onClick={() => AddDot()}/>
                <input type="button" className="button bg-slate-200 cursor-pointer hover:bg-slate-300 active:bg-slate-200 border border-slate-500 p-4 w-[25%] zero" value="0" onClick={() => AddNumber('0')}/>
                <input type="button" className="button bg-green-900 text-white cursor-pointer hover:bg-green-800 active:bg-green-900 border border-slate-500 p-4 w-[50%] equal" value="=" onClick={() => Result()}/>
            </div>
        </div>
    )
}
