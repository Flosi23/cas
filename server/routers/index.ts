import * as trpc from "@trpc/server";
import { z } from "zod";
import { calcTreeSpacing } from "$tree";
import parseExpression from "$cas/parse";
import simplify from "$cas/simplify/simplify";

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
			return calcTreeSpacing(exp);
		},
	})
	.mutation("simplifiedTree", {
		input: z.object({ expr: z.string() }),
		resolve({ input }) {
			const expr = parseExpression(input.expr.trim().replace(/\s/g, ""));
			const simplifiedExpr = simplify(expr);

			if (!simplifiedExpr) {
				throw new Error("Invalid Expression!");
			}

			return calcTreeSpacing(simplifiedExpr);
		},
	});

export type AppRouter = typeof appRouter;
