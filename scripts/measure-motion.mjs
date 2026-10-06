import { createRequire } from "node:module";
import { basename, resolve } from "node:path";
import { gzipSync } from "node:zlib";

// Proxy comparable entre revisões; React permanece externo nos dois cenários.
const packageRequire = createRequire(resolve("packages/motion/package.json"));
const { build } = createRequire(packageRequire.resolve("tsup"))("esbuild");
const measurement = {};
for (const [name, contents] of Object.entries({
	button: 'export { Button } from "@design-systems-orion/ui/button"',
	pilots:
		'export { FiltersCard } from "./src/filters-card"; export { LauncherCard } from "./src/launcher-card";',
})) {
	const result = await build({
		stdin: {
			contents,
			resolveDir: resolve("packages/blocks"),
			sourcefile: `${name}.tsx`,
			loader: "tsx",
		},
		bundle: true,
		format: "esm",
		splitting: true,
		platform: "browser",
		jsx: "automatic",
		external: ["react", "react-dom", "react/jsx-runtime"],
		minify: true,
		write: false,
		outdir: ".tmp/orion-motion/measurement",
		metafile: true,
	});
	measurement[name] = {
		chunks: result.outputFiles.map((file) => ({
			name: basename(file.path),
			bytes: file.contents.length,
			gzip: gzipSync(file.contents).length,
		})),
		animeIncluded: Object.keys(result.metafile.inputs).some((path) => path.includes("animejs")),
		motionIncluded: Object.keys(result.metafile.inputs).some((path) =>
			/framer-motion|motion-dom/.test(path),
		),
	};
}
console.log(JSON.stringify(measurement, null, 2));
