import type { Meta, StoryObj } from "@storybook/react";

import { ImpersonationBanner } from "./impersonation-banner";

const meta: Meta<typeof ImpersonationBanner> = {
	title: "Blocks/ImpersonationBanner",
	component: ImpersonationBanner,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImpersonationBanner>;

export const Default: Story = {
	args: {
		userLabel: "Maria Silva (maria@supertrans.com)",
	},
	render: (args) => <ImpersonationBanner {...args} onStop={() => {}} />,
};

export const MensagemCustomizada: Story = {
	render: () => (
		<ImpersonationBanner
			userLabel="joao@supertrans.com"
			onStop={() => {}}
			message={(userLabel) => <>Sessão de suporte ativa como {userLabel}.</>}
			stopLabel="Sair do modo suporte"
		/>
	),
};
