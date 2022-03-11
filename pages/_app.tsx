import type { AppProps as NextAppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import createEmotionCache from "$app/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
	emotionCache?: EmotionCache;
}

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps): JSX.Element {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>LSG</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
				<ChakraProvider>
						<Component {...pageProps} />
				</ChakraProvider>
		</CacheProvider>
	);
}