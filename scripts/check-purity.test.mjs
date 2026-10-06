import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

test("motion rejects Next and data-fetching imports while allowing pure policy", (t) => {
	const root = mkdtempSync(join(tmpdir(), "orion-motion-purity-"));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	mkdirSync(join(root, "packages/tokens"), { recursive: true });
	mkdirSync(join(root, "packages/motion/src"), { recursive: true });
	copyFileSync(
		new URL("../packages/tokens/brands.json", import.meta.url),
		join(root, "packages/tokens/brands.json"),
	);
	const source = join(root, "packages/motion/src/index.ts");
	const check = () =>
		spawnSync(process.execPath, [fileURLToPath(new URL("./check-purity.mjs", import.meta.url))], {
			cwd: root,
			encoding: "utf8",
			windowsHide: true,
		});
	writeFileSync(source, "export const enabled = false;");
	assert.equal(check().status, 0);
	writeFileSync(source, 'import Link from "next/link";\nimport axios from "axios";');
	const result = check();
	assert.equal(result.status, 1);
	assert.match(result.stderr, /import de next/);
	assert.match(result.stderr, /data-fetching/);
});
