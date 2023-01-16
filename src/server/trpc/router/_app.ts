import { router } from "../trpc";
import { authRouter } from "./auth";
import { dbRouter } from "./db";

export const appRouter = router({
  auth: authRouter,
  db: dbRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
