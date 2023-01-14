import { z } from "zod";

import { router, publicProcedure, protectedProcedure} from "../trpc";

const startBudgetZod = z.object({
  month: z.number(),
  year: z.number(),
  total: z.number(),
  strict: z.number()
})

export const dbRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  startBudget: protectedProcedure
    .input(startBudgetZod)
    .mutation(async ({ input, ctx: {prisma, session} }) => {
      const newBudget = await prisma.budget.create({
        data: {
          month: input.month,
          year: input.year,
          total: input.total,
          strict: input.strict,
          userId: session.user.id
        }
      })

      console.log(newBudget);

      return newBudget
      
    })
  
});
