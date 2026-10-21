import { defineConfig } from "tsup";

import { version } from "./package.json";

export default defineConfig({
	clean: true,
	define: {
		// Injected instead of importing `package.json` in the sources (outside of `rootDir`)
		__PACKAGE_VERSION__: JSON.stringify(version),
	},
	dts: true,
	entry: ["./src/index.ts"],
	minify: true,
	outDir: "./dist",
	sourcemap: true,
	treeshake: true,
	tsconfig: "./tsconfig.json",
});
