import type { Meta, StoryObj } from "@storybook/react";
import { Activity, Box } from "lucide-react";
import * as React from "react";

import { Badge, Button } from "@design-systems-orion/ui";
import { ImpactAnalysisDialog } from "./impact-analysis-dialog";

const meta: Meta<typeof ImpactAnalysisDialog> = {
	title: "Blocks/ImpactAnalysisDialog",
	component: ImpactAnalysisDialog,
};

export default meta;

type Story = StoryObj<typeof ImpactAnalysisDialog>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = React.useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Ver análise de impacto</Button>
				<ImpactAnalysisDialog
					open={open}
					onOpenChange={setOpen}
					subject={<Badge className="font-mono text-sm">CRIAR_DEMANDA</Badge>}
					subjectDescription="Permite criar novas demandas."
					lastChange={[
						{ label: "Por", value: "Maria Silva" },
						{ label: "Data", value: "20/07/2026" },
						{ label: "Ação", value: "GRANT" },
					]}
					categories={[
						{ id: "activities", title: "Funcionalidades", icon: Activity, items: ["Demandas"] },
						{ id: "modules", title: "Módulos", icon: Box, items: ["Gestão de Demandas"] },
					]}
				/>
			</>
		);
	},
};
