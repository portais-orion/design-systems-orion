import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

/** Resolve o caminho absoluto de um pacote — necessário em monorepos pnpm. */
function getAbsolutePath(value: string) {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
	framework: getAbsolutePath("@storybook/react-vite"),
	stories: [
		"../src/**/*.mdx",
		"../stories/**/*.stories.@(ts|tsx)",
		"../../../packages/ui/src/**/*.stories.@(ts|tsx)",
		"../../../packages/blocks/src/**/*.stories.@(ts|tsx)",
	],
	// As logos de marca (fonte única em /assets) viram estáticos servidos em
	// /brands — o switcher de marca e o comparativo referenciam /brands/<id>-logo.png.
	staticDirs: [{ from: "../../../assets", to: "/brands" }],
	addons: [
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-vitest"),
		getAbsolutePath("@chromatic-com/storybook"),
	],
	async viteFinal(config) {
		const { default: tailwindcss } = await import("@tailwindcss/vite");
		config.plugins = [...(config.plugins ?? []), tailwindcss()];
		return config;
	},
};

export default config;
