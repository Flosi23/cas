import {
	extendTheme,
	withDefaultColorScheme,
	ThemeConfig,
	theme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
};

export default extendTheme(
	{ config },
	{
		colors: {
			...theme.colors.blue,
		},
	},
	withDefaultColorScheme({
		colorScheme: "brand",
	}),
) as {
	config: typeof config;
};
