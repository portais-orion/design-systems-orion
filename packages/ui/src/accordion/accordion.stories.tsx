import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta: Meta<typeof Accordion> = {
	title: "UI/Accordion",
	component: Accordion,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
	render: () => (
		<Accordion type="single" className="w-96">
			<AccordionItem value="item-1">
				<AccordionTrigger>O que é o Núcleo de Portais?</AccordionTrigger>
				<AccordionContent>
					A base oficial de componentes, tokens e padrões dos portais do grupo.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Como os temas funcionam?</AccordionTrigger>
				<AccordionContent>Por CSS variables com data-brand — nunca por props.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const Multiple: Story = {
	render: () => (
		<Accordion type="multiple" className="w-96">
			{["Seção A", "Seção B", "Seção C"].map((s, i) => (
				<AccordionItem key={s} value={`m-${i}`}>
					<AccordionTrigger>{s}</AccordionTrigger>
					<AccordionContent>Conteúdo de {s} — várias podem ficar abertas.</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
};

export const WithLongContent: Story = {
	render: () => (
		<Accordion type="single" className="w-96">
			<AccordionItem value="longo">
				<AccordionTrigger>Detalhes completos</AccordionTrigger>
				<AccordionContent>
					{Array.from({ length: 6 }).map((_, i) => (
						<p key={`p-${i + 1}`} className="mb-2">
							Parágrafo {i + 1} de conteúdo extenso dentro do painel do accordion.
						</p>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const DisabledItem: Story = {
	render: () => (
		<Accordion type="single" className="w-96">
			<AccordionItem value="ok">
				<AccordionTrigger>Disponível</AccordionTrigger>
				<AccordionContent>Este item abre normalmente.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="bloqueado" disabled>
				<AccordionTrigger>Indisponível</AccordionTrigger>
				<AccordionContent>Nunca visível.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};
