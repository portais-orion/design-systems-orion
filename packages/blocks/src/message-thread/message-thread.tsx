"use client";

import * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído da thread da Central de Atendimento do portal-supertrans: área
 * rolável de mensagens que se mantém no fim quando chega conteúdo novo.
 */
export type MessageThreadProps = {
	children: React.ReactNode;
	/**
	 * Quando este valor muda, a área rola até o fim. Passe algo que mude com o
	 * conteúdo (número de itens, id da conversa aberta).
	 */
	scrollKey?: React.Key;
	/** Rótulo acessível da região de mensagens. */
	label?: string;
	className?: string;
};

/**
 * Container rolável das mensagens de uma conversa, com fundo sutil. Componha
 * com `MessageBubble` e `ThreadEvent`. Rola até o fim sempre que `scrollKey`
 * muda; não rola por re-render sem mudança.
 */
export function MessageThread({
	children,
	scrollKey,
	label = "Mensagens",
	className,
}: MessageThreadProps) {
	const end = React.useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: rolar apenas quando scrollKey muda
	React.useEffect(() => {
		end.current?.scrollIntoView({ block: "end" });
	}, [scrollKey]);

	return (
		<div
			role="log"
			aria-label={label}
			className={cn("flex flex-1 flex-col gap-3 overflow-y-auto bg-muted/30 px-6 py-5", className)}
		>
			{children}
			<div ref={end} />
		</div>
	);
}
