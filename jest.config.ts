import { JestConfigWithTsJest } from "ts-jest";

export default {
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/**/index.ts",
		"!<rootDir>/src/configs/*.ts",
	],
	coverageThreshold: { global: { branches: 75, functions: 75, lines: 75, statements: 75 } },
	moduleFileExtensions: ["js", "ts"],
	setupFilesAfterEnv: [],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	transform: {
		"^.+\\.[tj]s$": [
			"ts-jest",
			// Type-checking is done by `npm run typecheck` (the tests also run with other ESLint versions)
			{ diagnostics: { exclude: ["**"] }, tsconfig: "<rootDir>/tsconfig.spec.json" },
		],
	},
	transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
} satisfies JestConfigWithTsJest;
