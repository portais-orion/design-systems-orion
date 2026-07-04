import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import "../src/styles.css";

/*
 * Toolbar global de marca: todo componente do Núcleo deve ser validado
 * nas duas marcas. O decorator aplica data-brand no <html>, então os
 * temas de @grupo/tokens resolvem as CSS variables da marca ativa.
 * Nenhum provider de app real (Auth, Query) é usado aqui — o Storybook
 * do Núcleo é independente dos portais.
 */
const withBrand: Decorator = (Story, context) => {
	const brand = (context.globals.brand as string) ?? "supertrans";
	document.documentElement.setAttribute("data-brand", brand);
	return (
		<div className="bg-background p-6 text-foreground">
			<Story />
		</div>
	);
};

const preview: Preview = {
	globalTypes: {
		brand: {
			description: "Marca ativa (tema de tokens)",
			toolbar: {
				title: "Marca",
				icon: "paintbrush",
				items: [
					{ value: "supertrans", title: "Supertrans" },
					{ value: "aurora", title: "Aurora" },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		brand: "supertrans",
	},
	decorators: [withBrand],
	parameters: {
		options: {
			storySort: {
				order: ["Ínicio", "Fundações", "UI", "Blocks", "Núcleo"],
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
