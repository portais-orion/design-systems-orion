import type { Meta, StoryObj } from "@storybook/react";

import { MetricGaugeCard } from "./metric-gauge-card";

const meta: Meta<typeof MetricGaugeCard> = {
	title: "Blocks/MetricGaugeCard",
	component: MetricGaugeCard,
};

export default meta;

type Story = StoryObj<typeof MetricGaugeCard>;

export const Default: Story = {
	render: () => (
		<div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
			<MetricGaugeCard
				label="Latência"
				value="12"
				unit="ms"
				tone="success"
				tooltip="P95 das últimas 24h."
			/>
			<MetricGaugeCard label="Hit rate" value="87" unit="%" tone="warning" progress={87} />
			<MetricGaugeCard label="Erros" value="248" tone="danger" />
		</div>
	),
};
