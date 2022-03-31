import * as trpc from "@trpc/server";
import { z } from "zod";
import parseExpression from "$cas/parse";
import { exprToDisplayExpr } from "../display/DisplayExpression";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = trpc
	.router<Record<string, unknown>>()
	.mutation("tree", {
		input: z.object({ expr: z.string() }),
		resolve({ input }) {
			const exp = parseExpression(input.expr.trim().replace(/\s/g, ""));
			return exprToDisplayExpr(exp);
		},
	});

export type AppRouter = typeof appRouter;
