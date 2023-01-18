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

    const addBudget = (total: number, strict: number, spent: number, month: number, year: number) => {
        setBudget(() => {
            return {
            total,
            strict, 
            spent,
            gains: [],
            expenses: []
        }})
        
    }

    const addGain = (description: string, amount: number) => {
        setBudget((prev: any) => {
            return {
                ...prev,
                total: prev.total + amount,
                strict: prev.total + amount,
                gains: [...prev.gains, {description, amount}]
            }
        })
    }

    const addExpense = (description: string, amount: number) => {
        setBudget((prev: any) => {
            return {
                ...prev,
                spent: prev.spent + amount,
                expenses: [...prev.expenses, {description, amount}]
            }
        })
    }

    return {addBudget, addExpense, addGain, budget}
}