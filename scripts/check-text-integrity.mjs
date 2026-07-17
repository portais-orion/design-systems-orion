/*
 * Fails when tracked source/docs contain common signs of destructive
 * transcoding: replacement chars, C0 controls, or classic UTF-8/CP1252
 * mojibake. Dependency-free, cheap enough for pnpm check.
 */
import { readFileSync } from "node:fs";

import { extensionOf, walkFiles } from "./lib/repo-scan.mjs";

const root = process.cwd();

const textExtensions = new Set([
	".css",
	".html",
	".js",
	".json",
	".jsx",
	".md",
	".mdx",
	".mjs",
	".mts",
	".ts",
	".tsx",
	".txt",
	".yml",
	".yaml",
]);

const classicMojibakePattern = /(?:Ã[\u0080-\u00bf]|Â[\u0080-\u00bf]|â[\u0080-\u00bf]{1,2})/u;

function hasC0ControlCharacter(line) {
	for (let index = 0; index < line.length; index++) {
		const code = line.charCodeAt(index);
		if (
			(code >= 0x00 && code <= 0x08) ||
			code === 0x0b ||
			code === 0x0c ||
			(code >= 0x0e && code <= 0x1f)
		) {
			return true;
		}
	}
	return false;
}

const checks = [
	{ name: "replacement character (U+FFFD)", test: (line) => line.includes("\uFFFD") },
	{ name: "C0 control character", test: hasC0ControlCharacter },
	{ name: "classic mojibake", test: (line) => classicMojibakePattern.test(line) },
];

const shouldScan = ({ name }) => name === "AGENTS.md" || textExtensions.has(extensionOf(name));

const findings = [];

for (const { full, path: rel } of walkFiles(root, { includeFile: shouldScan })) {
	const text = readFileSync(full, "utf8");
	const lines = text.split(/\r?\n/);
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		for (const check of checks) {
			if (check.test(line)) {
				findings.push({ file: rel, line: index + 1, name: check.name, text: line.trim() });
			}
		}
	}
}

if (findings.length > 0) {
	console.error(`check:integrity FALHOU — ${findings.length} ocorrência(s) suspeita(s).`);
	for (const finding of findings.slice(0, 80)) {
		console.error(`- ${finding.file}:${finding.line} ${finding.name}: ${finding.text}`);
	}
	if (findings.length > 80) console.error(`... e mais ${findings.length - 80} ocorrência(s).`);
	process.exit(1);
}

console.log("check:integrity OK — texto UTF-8 sem sinais de corrupção.");
