import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";
import * as React from "react";

import { Button } from "@design-systems-orion/ui";
import { OnboardingDialog } from "./onboarding-dialog";

const meta: Meta<typeof OnboardingDialog> = {
	title: "Blocks/OnboardingDialog",
	component: OnboardingDialog,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OnboardingDialog>;

function Demo() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Reabrir onboarding</Button>
			<OnboardingDialog
				open={open}
				onOpenChange={setOpen}
				title="Bem-vindo ao novo Configurador"
				description="Uma experiência simplificada para gestão de acessos e permissões."
				icon={Sparkles}
				onConfirm={() => setOpen(false)}
				steps={[
					{
						title: "Modo simplificado",
						description:
							"Oculte a complexidade técnica e foque apenas no que importa: conceder acessos e perfis.",
						tone: "info",
					},
					{
						title: "Linguagem de negócio",
						description: "Termos técnicos agora usam a linguagem do dia a dia do usuário.",
						tone: "success",
					},
					{
						title: "Alternância fácil",
						description:
							"Precisa de recursos avançados? Alterne pelo menu lateral a qualquer momento.",
						tone: "warning",
					},
				]}
			/>
		</>
	);
}

export const Default: Story = { render: () => <Demo /> };
