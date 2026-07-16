import { Button } from "@portais-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import catalog from "../../../packages/tokens/brands.json";

/*
 * Comparativo lado a lado: o MESMO componente sob todos os temas,
 * via [data-brand] em containers — prova de que a marca é CSS, não prop.
 */
const meta: Meta = {
	title: "Núcleo/Comparativo de Marcas",
};

export default meta;

function Amostra() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Button>Primário</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secundário</Button>
			<Button variant="destructive">Destrutivo</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	);
}

export const LadoALado: StoryObj = {
	render: () => (
		<div className="grid gap-6">
			{catalog.brands.map((brand) => (
				<section
					key={brand.id}
					data-brand={brand.id}
					className="rounded-lg border border-border bg-background p-6"
				>
					<p className="mb-3 text-sm font-medium text-muted-foreground">{brand.label}</p>
					<Amostra />
				</section>
			))}
		</div>
	),
};

export const TokensDeMarca: StoryObj = {
	render: () => (
		<div className="grid gap-6">
			{catalog.brands.map((brand) => (
				<section
					key={brand.id}
					data-brand={brand.id}
					className="rounded-lg border border-border p-6"
				>
					<p className="mb-3 text-sm font-medium text-muted-foreground">{brand.label}</p>
					<div className="flex gap-3">
						<div className="size-16 rounded-md bg-primary" title="--primary" />
						<div className="size-16 rounded-md bg-primary-hover" title="--primary-hover" />
						<div className="size-16 rounded-md bg-brand-accent" title="--brand-accent" />
						<div className="size-16 rounded-md bg-sidebar" title="--sidebar" />
					</div>
				</section>
			))}
		</div>
	),
};
