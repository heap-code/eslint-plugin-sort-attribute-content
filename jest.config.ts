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
			{
				tsconfig: "<rootDir>/tsconfig.spec.json",
			},
		],
	},
	transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
} satisfies JestConfigWithTsJest;
