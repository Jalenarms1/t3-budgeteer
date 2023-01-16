import { Gain } from "@prisma/client";
import { Input } from "postcss";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure} from "../trpc";

const startBudgetZod = z.object({
  month: z.number(),
  year: z.number(),
  total: z.number(),
  strict: z.number(),
  spent: z.number()
})

const gainExpenseZod = z.object({
  description: z.string(),
  amount: z.number(),
  budgetId: z.string()
})

export const dbRouter = router({
  startBudget: protectedProcedure
    .input(startBudgetZod)
    .mutation(async ({ input, ctx: {prisma, session} }) => {
      const newBudget = await prisma.budget.create({
        data: {
          month: input.month,
          year: input.year,
          total: input.total,
          strict: input.strict,
          spent: input.spent,
          userId: session.user.id
        }
      })

      console.log(newBudget);

      return newBudget
      
    }),
  getBudget: publicProcedure
    .query(async ({ctx: {prisma, session}}) => {
      try {
        if(session) {
          const userBudget = await prisma.budget.findFirst({
            where: {
              userId: session?.user?.id
            }
          })
          if(userBudget) {
            return userBudget
          } else {
            return null
          }

        } else {
          return null
        }

        
      } catch (error) {
        console.log(error);
        return error
        
      }
    }),
  addGain: protectedProcedure
    .input(gainExpenseZod)
    .mutation(async ({ctx: {prisma, session}, input: {budgetId, description, amount}}) => {
      try {
        const newGain = await prisma.gain.create({
          data: {
            budgetId, 
            description,
            amount
          }
        })

        if(newGain) {
          const updBudget = await prisma.budget.update({
            where: {
              id: budgetId
            },
            data: {
              total: {increment: amount},
              strict: {increment: amount}
            }
          })

          if(updBudget) {
            return updBudget
          } else {
            return null
          }
        } else {
          return null
        }

      } catch (error) {
        console.log(error);
        
        return error
      }
    }),
    addExpense: protectedProcedure
    .input(gainExpenseZod)
    .mutation(async ({ctx: {prisma}, input: {budgetId, description, amount}}) => {
      try {
        const newGain = await prisma.expense.create({
          data: {
            budgetId, 
            description,
            amount
          }
        })

        if(newGain) {
          const updBudget = await prisma.budget.update({
            where: {
              id: budgetId
            },
            data: {
              spent: {increment: amount}
            }
          })

          if(updBudget) {
            return updBudget
          } else {
            return null
          }
        } else {
          return null
        }

      } catch (error) {
        console.log(error);
        
        return error
      }
    }),
  getGainsAndExpenses: publicProcedure
    .input(z.object({budgetId: z.string().optional()}))
    .query(async ({ctx: {prisma, session}, input}) => {
      try {
        const finalArr: Gain[] = [];
        const gains = await prisma.gain.findMany({
          where: {
            budgetId: input.budgetId
          }
        })

        const expenses = await prisma.expense.findMany({
          where: {
            budgetId: input.budgetId
          }
        })

        gains.forEach(item => {
          const gain = {
            ...item,
            gain: true
          }
          finalArr.push(gain)
        })
        
        expenses.forEach(item => {
          const expense = {
            ...item,
            expense: true
          }
          finalArr.push(expense)
        })

        return {items: finalArr.sort((a: any, b: any) => b.createdAt - a.createdAt)}
      } catch (error) {
        console.log(error);
        return error
        
      }
    })
  
});
