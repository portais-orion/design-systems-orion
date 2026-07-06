import type { Meta, StoryObj } from "@storybook/react";
import { Boxes, Truck } from "lucide-react";
import { LauncherCard } from "./launcher-card";

const meta: Meta<typeof LauncherCard> = {
	title: "Blocks/LauncherCard",
	component: LauncherCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LauncherCard>;

export const Default: Story = {
	args: {
		icon: Boxes,
		title: "Gestão de Demandas",
		description: "Acompanhe e programe as demandas operacionais.",
		cta: "Abrir →",
	},
};

export const Clicavel: Story = {
	args: {
		icon: Truck,
		title: "Acompanhamento de Cargas",
		description: "Monitoramento de cargas em trânsito.",
		cta: "Abrir →",
		onClick: () => {},
	},
};

export const Grade: Story = {
	render: () => (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<LauncherCard
				icon={Boxes}
				title="Gestão de Demandas"
				description="Programe demandas."
				cta="Abrir →"
			/>
			<LauncherCard
				icon={Truck}
				title="Acompanhamento de Cargas"
				description="Cargas em trânsito."
				cta="Abrir →"
			/>
		</div>
	),
};
