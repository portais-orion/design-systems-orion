import type * as React from "react";

import { Avatar, AvatarFallback, cn } from "@design-systems-orion/ui";

/*
 * Extraído da thread da Central de Atendimento do portal-supertrans: cabeçalho
 * da conversa aberta, com avatar, nome, subtítulo e ações à direita.
 */
export type ConversationHeaderProps = {
	title: string;
	/** Iniciais do avatar. Veja `getInitials` em `ConversationListItem`. */
	avatarFallback: string;
	/** Linha sob o nome (canal, cliente, endereço). */
	subtitle?: React.ReactNode;
	/** Slot à direita (status de canal, botões). */
	actions?: React.ReactNode;
	className?: string;
};

/** Cabeçalho da conversa aberta: identifica o interlocutor e abriga ações. */
export function ConversationHeader({
	title,
	avatarFallback,
	subtitle,
	actions,
	className,
}: ConversationHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-none items-center gap-2.5 border-b border-border bg-card px-6 py-3.5",
				className,
			)}
		>
			<Avatar className="size-9">
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex-1">
				<div className="truncate text-sm font-bold text-foreground">{title}</div>
				{subtitle && (
					<div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
						{subtitle}
					</div>
				)}
			</div>
			{actions && <div className="flex flex-none items-center gap-2">{actions}</div>}
		</div>
	);
}
