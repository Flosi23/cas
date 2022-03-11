import * as trpc from "@trpc/server";
import { z } from "zod";
import parseExpression from "$cas/parse";

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
			return parseExpression(input.expr.trim().replace(/\s/g, ""));
		},
	});

export type AppRouter = typeof appRouter;
