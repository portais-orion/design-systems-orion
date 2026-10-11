import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído da Central de Atendimento do portal-supertrans: caixa de entrada
 * em três colunas — lista de conversas, conversa aberta e painel de contexto.
 */
export type InboxLayoutProps = {
	/** Coluna esquerda: busca, filtros e lista de conversas. */
	list: React.ReactNode;
	/** Coluna central: a conversa aberta. */
	children: React.ReactNode;
	/** Coluna direita: contexto da conversa. Oculta abaixo de `lg`. */
	aside?: React.ReactNode;
	className?: string;
};

/**
 * Layout de caixa de entrada em três colunas que ocupa toda a altura do
 * contêiner pai (que precisa ter altura definida). A lista tem largura fixa de
 * 300px, o painel de contexto 260px, e a conversa ocupa o restante. Cada
 * coluna rola por conta própria; o bloco só distribui o espaço.
 */
export function InboxLayout({ list, children, aside, className }: InboxLayoutProps) {
	return (
		<div className={cn("flex h-full w-full overflow-hidden bg-card", className)}>
			<div className="flex w-[300px] flex-none flex-col border-r border-border">{list}</div>
			<div className="flex min-w-0 flex-1 flex-col">{children}</div>
			{aside && (
				<aside className="hidden w-[260px] flex-none flex-col gap-4 overflow-y-auto border-l border-border p-5 lg:flex">
					{aside}
				</aside>
			)}
		</div>
	);
}
