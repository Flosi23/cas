import * as trpc from "@trpc/server";
import { z } from "zod";
import parseExpression from "$cas/parse";
import { exprToDisplayExpr } from "../display/DisplayExpression";
import { getRow } from "../display/tree";

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
			const dExp = exprToDisplayExpr(exp);
			return dExp;
		},
	});

export type AppRouter = typeof appRouter;
