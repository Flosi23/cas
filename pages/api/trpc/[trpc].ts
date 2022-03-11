/**
 * This file contains tRPC's HTTP response handler
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "$routers/index";
import { createContext } from "./context";

export default trpcNext.createNextApiHandler({
	createContext,
	onError({ error }) {
		if (error.code === "INTERNAL_SERVER_ERROR") {
			// send to bug reporting
			console.error("Something went wrong", error);
		}
	},
	router: appRouter,
});
