import {useState, useEffect} from 'react'

export const useLocalStorage = (key: any, initialValue: any) => {
    
    const [value, setValue] = useState(() => {
        const items = localStorage.getItem(key);
        if(!items || items == "undefined") {
            return initialValue
        }

        if(items) {
            console.log(items)
            const data = JSON.parse(items);

            return data
        }

        if(typeof initialValue === "function"){
            return initialValue();
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export const useSetGetLocalStorage = () => {
    const [budget, setBudget] = useLocalStorage('budget', []);
    const date = new Date()
    const addBudget = (total: number, strict: number, spent: number, month: number, year: number) => {
        setBudget(() => {
            return {
            total,
            strict, 
            spent,
            allActivity: []
        }})
        location.reload()
    }

    const addGain = (description: string, amount: number) => {
        setBudget((prev: any) => {
            return {
                ...prev,
                total: prev.total + amount,
                strict: prev.strict + amount,
                allActivity: [...prev.allActivity, {description, amount, createdAt: date.toLocaleDateString(), gain: true }].sort((a:any, b:any) => b.createdAt - a.createdAt)
            }
        })
        location.reload()

    }

    const addExpense = (description: string, amount: number) => {
        setBudget((prev: any) => {
            return {
                ...prev,
                spent: prev.spent + amount,
                allActivity: [...prev.allActivity, {description, amount, createdAt: date.toLocaleDateString(), expense: true }].sort((a:any, b:any) => b.createdAt - a.createdAt)

            }
        })
        location.reload()

    }

    const restartBudget = () => {
        localStorage.removeItem('budget')
        location.reload()
    }

    return {addBudget, addExpense, addGain, budget, setBudget, restartBudget}
}