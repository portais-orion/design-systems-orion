import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { IGNORED_DIRS, extensionOf, toRepositoryPath, walkFiles } from "./lib/repo-scan.mjs";

function makeTree(files) {
	const root = mkdtempSync(path.join(tmpdir(), "repo-scan-"));
	for (const [relativePath, content] of Object.entries(files)) {
		const full = path.join(root, ...relativePath.split("/"));
		mkdirSync(path.dirname(full), { recursive: true });
		writeFileSync(full, content, "utf8");
	}
	return root;
}

const scanAll = (root) => [...walkFiles(root, { includeFile: () => true })].map((f) => f.path);

test("yields nested source files with repository-relative paths", (t) => {
	const root = makeTree({
		"a.ts": "",
		"packages/ui/src/button/button.tsx": "",
		"docs/adr/0001.md": "",
	});
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(scanAll(root).sort(), [
		"a.ts",
		"docs/adr/0001.md",
		"packages/ui/src/button/button.tsx",
	]);
});

test("skips build output and caches at any depth", (t) => {
	const root = makeTree({
		"packages/ui/src/index.ts": "",
		"packages/ui/dist/index.mjs": "",
		"node_modules/react/index.js": "",
		"apps/docs/.next/build.js": "",
		"apps/docs/.source/index.ts": "",
		"coverage/report.json": "",
		".turbo/log.txt": "",
		"storybook-static/iframe.html": "",
	});
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(scanAll(root), ["packages/ui/src/index.ts"]);
});

test("ignore list covers what both gates used to skip on their own", () => {
	for (const dir of [
		"node_modules",
		".turbo",
		".git",
		".next",
		".source",
		"storybook-static",
		"dist",
		".tmp",
		".pnpm-store",
		"coverage",
	]) {
		assert.ok(IGNORED_DIRS.has(dir), `${dir} deve ser ignorado`);
	}
});

test("includeFile receives the relative path and the file name", (t) => {
	const root = makeTree({ "packages/ui/src/button.tsx": "", "packages/ui/src/button.css": "" });
	t.after(() => rmSync(root, { recursive: true, force: true }));

	const seen = [];
	const files = [
		...walkFiles(root, {
			includeFile: (file) => {
				seen.push(file);
				return extensionOf(file.name) === ".tsx";
			},
		}),
	];

	assert.deepEqual(
		files.map((f) => f.path),
		["packages/ui/src/button.tsx"],
	);
	assert.deepEqual(seen.map((f) => f.name).sort(), ["button.css", "button.tsx"]);
	assert.ok(seen.every((f) => !path.isAbsolute(f.path)));
});

test("normalizes separators and reads extensions", () => {
	assert.equal(toRepositoryPath(path.join("/repo"), path.join("/repo", "a", "b.ts")), "a/b.ts");
	assert.equal(extensionOf("button.stories.tsx"), ".tsx");
	assert.equal(extensionOf("AGENTS"), "");
});
