import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

/*
 * Roda o tsup com heap maior para o worker de geração de .d.ts, sem depender
 * de variável de ambiente (NODE_OPTIONS) — algumas máquinas corporativas
 * bloqueiam `set`/`export` de variáveis de ambiente por política de grupo.
 *
 * @design-systems-orion/blocks já passou de 60 entry points; o worker de DTS do tsup
 * (rollup-plugin-dts) estourava o heap default do Node processando todos de
 * uma vez (ERR_WORKER_OUT_OF_MEMORY). Passar o heap direto na invocação do
 * processo (via argv do node, não do shell) resolve sem tocar em política de
 * ambiente.
 *
 * Resolve `tsup` a partir do cwd (o pacote que chamou `pnpm build`), não a
 * partir deste arquivo — este script mora em scripts/, fora da árvore de
 * node_modules do pacote, então require.resolve local não o encontraria.
 *
 * Uso: node ../../scripts/run-tsup-big-heap.mjs   (a partir de packages/<pkg>)
 */
const require = createRequire(pathToFileURL(`${process.cwd()}/`).href);
const tsupCli = require.resolve("tsup/dist/cli-node.js");

const HEAP_MB = process.env.TSUP_MAX_OLD_SPACE_MB ?? "24576";

const result = spawnSync(process.execPath, [`--max-old-space-size=${HEAP_MB}`, tsupCli], {
	stdio: "inherit",
});

process.exit(result.status ?? 1);
