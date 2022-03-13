import type { AppRouter } from "$routers/index";
import type { AppProps as NextAppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { httpLink } from "@trpc/client/links/httpLink";
import { withTRPC } from "@trpc/next";
import Head from "next/head";
import theme from "$/app/theme";
import createEmotionCache from "$app/createEmotionCache";
import "$app/index.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
	emotionCache?: EmotionCache;
}

function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps): JSX.Element {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>CAS</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</CacheProvider>
	);
}

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [httpLink({ url: "/api/trpc" })],
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
})(App);
