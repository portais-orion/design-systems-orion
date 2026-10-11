import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído da thread da Central de Atendimento do portal-supertrans: balão de
 * mensagem alinhado por direção, com horário e linha de status no rodapé.
 */
export type MessageBubbleProps = {
	/** `incoming` = do interlocutor (esquerda); `outgoing` = nossa (direita). */
	direction: "incoming" | "outgoing";
	/** Conteúdo da mensagem. Quebras de linha são preservadas. */
	children: React.ReactNode;
	/** Horário já formatado. */
	timestamp?: string;
	/** Texto de estado ao lado do horário (ex.: "Enviando...", "Falha ao enviar"). */
	status?: React.ReactNode;
	className?: string;
};

/**
 * Balão de mensagem de uma conversa. Mensagens enviadas ficam à direita na cor
 * primária; recebidas, à esquerda sobre o card. O estado de entrega é livre
 * (`status`): o bloco não conhece o ciclo de envio do canal.
 */
export function MessageBubble({
	direction,
	children,
	timestamp,
	status,
	className,
}: MessageBubbleProps) {
	const outgoing = direction === "outgoing";
	return (
		<div className={cn("flex", outgoing && "justify-end", className)}>
			<div
				className={cn(
					"max-w-[60%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug",
					outgoing
						? "bg-primary text-primary-foreground"
						: "border border-border bg-card text-foreground",
				)}
			>
				<div>{children}</div>
				{(timestamp || status) && (
					<div className={cn("mt-1 text-[10px] opacity-70", outgoing ? "text-right" : "text-left")}>
						{timestamp}
						{status && (
							<>
								{timestamp ? " · " : null}
								{status}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
