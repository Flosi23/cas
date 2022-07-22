import {
	extendTheme,
	withDefaultColorScheme,
	ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
};

const brand = {
	"50": "#F5FCE8",
	"100": "#E3F7C0",
	"200": "#D2F297",
	"300": "#C0EC6F",
	"400": "#AEE746",
	"500": "#9CE21D",
	"600": "#7DB517",
	"700": "#5E8712",
	"800": "#3E5A0C",
	"900": "#1F2D06",
};

export default extendTheme(
	{ config },
	{
		colors: {
			brand,
		},
	},
	withDefaultColorScheme({
		colorScheme: "brand",
	}),
) as {
	config: typeof config;
};
