import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído da thread da Central de Atendimento do portal-supertrans: nota de
 * sistema centralizada entre as mensagens (assumido, transferido, encerrado).
 */
export type ThreadEventProps = {
	/** O que aconteceu. */
	title: React.ReactNode;
	/** Horário já formatado, exibido antes do título. */
	timestamp?: string;
	/** Complemento em itálico (motivo, destino). */
	detail?: React.ReactNode;
	className?: string;
};

/**
 * Nota de sistema no meio de uma conversa. Diferente de `MessageBubble`, não
 * pertence a nenhum dos lados: registra um fato do atendimento. Para uma
 * linha do tempo independente da conversa use `ActivityTimeline`.
 */
export function ThreadEvent({ title, timestamp, detail, className }: ThreadEventProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-0.5 py-1 text-center text-[11px] text-muted-foreground",
				className,
			)}
		>
			<span>
				{timestamp ? `${timestamp} — ` : null}
				{title}
			</span>
			{detail && <span className="max-w-[70%] text-[10.5px] italic">{detail}</span>}
		</div>
	);
}
