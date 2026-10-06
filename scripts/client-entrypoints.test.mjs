import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import {
	preserveClientBoundaries,
	preserveSourceClientBoundaries,
} from "./lib/client-entrypoints.mjs";

test("preserves client entry boundaries without marking the pure server entry", (t) => {
	const root = mkdtempSync(join(tmpdir(), "orion-client-entry-"));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	mkdirSync(join(root, "dist/react"), { recursive: true });
	writeFileSync(join(root, "dist/index.mjs"), "export const policy = true;\n");
	writeFileSync(join(root, "dist/react/index.mjs"), "export const Provider = true;\n");
	const directory = pathToFileURL(`${root}/`);
	const entries = [{ importTarget: "./dist/react/index.mjs" }];
	preserveClientBoundaries(directory, entries);
	preserveClientBoundaries(directory, entries);
	assert.equal(
		readFileSync(join(root, "dist/react/index.mjs"), "utf8"),
		'"use client";\nexport const Provider = true;\n',
	);
	assert.equal(readFileSync(join(root, "dist/index.mjs"), "utf8"), "export const policy = true;\n");
});

test("mixed component barrels keep pure helpers callable from server modules", (t) => {
	const root = mkdtempSync(join(tmpdir(), "orion-mixed-entry-"));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	mkdirSync(join(root, "src"));
	mkdirSync(join(root, "dist"));
	writeFileSync(join(root, "src/client.tsx"), '"use client";\nexport const Button = true;');
	writeFileSync(
		join(root, "src/index.ts"),
		'export { Button } from "./client";\nexport { cn } from "./pure";',
	);
	writeFileSync(join(root, "src/pure.ts"), 'export const cn = () => "x";');
	for (const name of ["index", "client", "pure"])
		writeFileSync(join(root, `dist/${name}.mjs`), "export {};\n");
	writeFileSync(
		join(root, "dist/metafile-esm.json"),
		JSON.stringify({
			outputs: {
				"dist/index.mjs": { inputs: { "src/index.ts": {} } },
				"dist/client.mjs": { inputs: { "src/client.tsx": {} } },
				"dist/pure.mjs": { inputs: { "src/pure.ts": {} } },
			},
		}),
	);
	preserveSourceClientBoundaries(pathToFileURL(`${root}/`));
	assert.match(readFileSync(join(root, "dist/client.mjs"), "utf8"), /^"use client";/);
	assert.doesNotMatch(readFileSync(join(root, "dist/index.mjs"), "utf8"), /use client/);
	assert.doesNotMatch(readFileSync(join(root, "dist/pure.mjs"), "utf8"), /use client/);
});
