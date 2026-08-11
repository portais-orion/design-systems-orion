import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import { useGlobals } from "storybook/preview-api";
import catalog from "../../../packages/tokens/brands.json";
import "../src/styles.css";

/*
 * Seletor global de marca por LOGO. A toolbar nativa do Storybook só aceita
 * ícones do set fixo, não imagens — então a marca é escolhida por um switcher
 * in-canvas que grava o global `brand` (persistido pelo Storybook) via
 * useGlobals. O decorator aplica data-brand no <html>, então os temas de
 * @design-systems-orion/tokens resolvem as CSS variables da marca ativa. As logos
 * vêm de /brands (staticDirs → /assets). Nenhum provider de app real (Auth,
 * Query) é usado aqui — o Storybook do Núcleo é independente dos portais.
 */
const withBrand: Decorator = (Story) => {
	const [globals, updateGlobals] = useGlobals();
	const brand = (globals.brand as string | undefined) ?? catalog.defaultBrand;
	document.documentElement.setAttribute("data-brand", brand);
	return (
		<div className="bg-background p-6 text-foreground">
			<div role="radiogroup" aria-label="Marca" className="mb-6 flex flex-wrap items-center gap-2">
				{catalog.brands.map((b) => (
					<button
						key={b.id}
						type="button"
						role="radio"
						aria-checked={brand === b.id}
						title={b.label}
						onClick={() => updateGlobals({ brand: b.id })}
						className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
							brand === b.id
								? "border-primary bg-primary/5"
								: "border-border opacity-60 hover:opacity-100"
						}`}
					>
						<img src={`/brands/${b.id}-logo.png`} alt={b.label} className="h-6 w-auto" />
					</button>
				))}
			</div>
			<Story />
		</div>
	);
};

const preview: Preview = {
	globalTypes: {
		brand: {
			description: "Marca ativa (tema de tokens)",
		},
	},
	initialGlobals: {
		brand: catalog.defaultBrand,
	},
	decorators: [withBrand],
	parameters: {
		options: {
			storySort: {
				order: ["Início", "Fundações", "UI", "Blocks", "Núcleo"],
			},
		},
		// 'todo' mostra violações no painel sem falhar o teste; 'error' falha no vitest
		a11y: { test: "todo" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
