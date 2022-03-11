import type { AppProps as NextAppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import theme from "$/app/theme";
import createEmotionCache from "$app/createEmotionCache";
import Nav from "$app/layout/Nav";

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
				<title>CAS</title>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<ChakraProvider theme={theme}>
				<Nav>
					<Component {...pageProps} />
				</Nav>
			</ChakraProvider>
		</CacheProvider>
	);
}
