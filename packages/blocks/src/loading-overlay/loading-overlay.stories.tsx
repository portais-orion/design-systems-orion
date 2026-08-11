import { Button, Card, CardContent, CardHeader, CardTitle } from "@design-systems-orion/ui";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DataTable } from "../data-table";
import { LoadingOverlay } from "./loading-overlay";

const meta: Meta<typeof LoadingOverlay> = {
	title: "Blocks/LoadingOverlay",
	component: LoadingOverlay,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

function Demo({ label }: { label?: string }) {
	const [loading, setLoading] = React.useState(true);
	return (
		<div className="space-y-3">
			<Button variant="outline" size="sm" onClick={() => setLoading((l) => !l)}>
				loading: {String(loading)}
			</Button>
			<LoadingOverlay loading={loading} label={label}>
				<Card className="w-80">
					<CardHeader>
						<CardTitle>Resumo</CardTitle>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Conteúdo permanece montado sob o overlay.
					</CardContent>
				</Card>
			</LoadingOverlay>
		</div>
	);
}

export const Default: Story = { render: () => <Demo label="Salvando..." /> };

export const WithCard: Story = { render: () => <Demo label="Atualizando resumo..." /> };

export const WithTable: Story = {
	render: function ComTabela() {
		const [loading, setLoading] = React.useState(true);
		const dados = Array.from({ length: 4 }).map((_, i) => ({
			id: `r-${i + 1}`,
			nome: `Registro ${i + 1}`,
			qtd: (i + 1) * 7,
		}));
		return (
			<div className="space-y-3">
				<Button variant="outline" size="sm" onClick={() => setLoading((l) => !l)}>
					loading: {String(loading)}
				</Button>
				<LoadingOverlay loading={loading} label="Recarregando...">
					<DataTable
						data={dados}
						columns={[
							{ header: "Nome", accessorKey: "nome" },
							{ header: "Qtd.", accessorKey: "qtd", align: "right" },
						]}
						keyExtractor={(r) => r.id}
					/>
				</LoadingOverlay>
			</div>
		);
	},
};

export const WithoutLabel: Story = {
	render: () => (
		<LoadingOverlay loading>
			<Card className="w-80">
				<CardContent className="py-10 text-center text-sm text-muted-foreground">
					Overlay sem label (spinner aria-hidden).
				</CardContent>
			</Card>
		</LoadingOverlay>
	),
};
