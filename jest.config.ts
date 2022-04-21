const config = {
	collectCoverageFrom: ["<rootDir>/server/cas/**/*.{js,jsx,ts,tsx}"],
	moduleNameMapper: {
		// Handle CSS imports (without CSS modules)
		"^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		"^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
		// Handle module aliases
		"^\\$app$": "<rootDir>/app",
		"^\\$app/(.*)$": "<rootDir>/app/$1",
		"^\\$cas$": "<rootDir>/server/cas",
		"^\\$cas/(.*)$": "<rootDir>/server/cas/$1",
		"^\\$lib$": "<rootDir>/lib",
		"^\\$lib/(.*)$": "<rootDir>/lib/$1",
		"^\\$pages$": "<rootDir>/pages",
		"^\\$pages/(.*)$": "<rootDir>/pages/$1",
		"^\\$routers$": "<rootDir>/server/routers",
		"^\\$routers/(.*)$": "<rootDir>/server/routers/$1",
		"^\\$tree$": "<rootDir>/server/tree",
		"^\\$tree/(.*)$": "<rootDir>/server/tree/$1",
	},
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/.vscode/",
		"<rootDir>/public/",
	],
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
};

export default config;
