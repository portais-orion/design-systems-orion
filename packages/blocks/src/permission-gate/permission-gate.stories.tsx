import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@design-systems-orion/ui";
import { PermissionGate, PermissionProvider } from "./permission-gate";

const meta: Meta<typeof PermissionGate> = {
	title: "Blocks/PermissionGate",
	component: PermissionGate,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PermissionGate>;

const grantedKeys = new Set(["CRIAR_DEMANDA", "EDITAR_DEMANDA"]);

const demoResolver = {
	hasPermission: (key: string) => grantedKeys.has(key),
	hasAny: (keys: string[]) => keys.some((k) => grantedKeys.has(k)),
	hasAll: (keys: string[]) => keys.every((k) => grantedKeys.has(k)),
	isLoading: false,
};

export const Permitido: Story = {
	render: () => (
		<PermissionProvider value={demoResolver}>
			<PermissionGate requires="CRIAR_DEMANDA">
				<Button>Nova demanda</Button>
			</PermissionGate>
		</PermissionProvider>
	),
};

export const Negado: Story = {
	render: () => (
		<PermissionProvider value={demoResolver}>
			<PermissionGate
				requires="EXCLUIR_DEMANDA"
				fallback={
					<span className="text-sm text-muted-foreground">Sem permissão para excluir.</span>
				}
			>
				<Button variant="destructive">Excluir demanda</Button>
			</PermissionGate>
		</PermissionProvider>
	),
};

export const Carregando: Story = {
	render: () => (
		<PermissionProvider value={{ ...demoResolver, isLoading: true }}>
			<PermissionGate requires="CRIAR_DEMANDA" fallback={<span>fallback (não deve aparecer)</span>}>
				<Button>Nova demanda</Button>
			</PermissionGate>
		</PermissionProvider>
	),
};
