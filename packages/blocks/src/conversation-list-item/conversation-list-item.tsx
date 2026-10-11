import type * as React from "react";

import { Avatar, AvatarFallback, cn } from "@design-systems-orion/ui";

/*
 * Extraído da caixa de entrada da Central de Atendimento do portal-supertrans
 * (service-requests-inbox.tsx): linha da lista de conversas com avatar, nome,
 * horário, prévia e indicador de não lida. Generalizado: canal, status e
 * vínculos do domínio entram pelos slots `previewIcon` e `meta`.
 */
export type ConversationListItemProps = {
	/** Nome do contato ou título da conversa. */
	title: string;
	/** Iniciais exibidas no avatar. Veja `getInitials`. */
	avatarFallback: string;
	/** Horário já formatado da última mensagem (ex.: "14:32", "Ontem"). */
	timestamp?: string;
	/** Última mensagem ou assunto. */
	preview?: React.ReactNode;
	/** Ícone pequeno antes da prévia (ex.: canal da conversa). */
	previewIcon?: React.ComponentType<{ className?: string }>;
	/** Conteúdo livre sob a prévia (status, vínculos, etiquetas). */
	meta?: React.ReactNode;
	/** Não lida: título em negrito e ponto indicador. */
	unread?: boolean;
	selected?: boolean;
	onSelect?: () => void;
	className?: string;
};

/** Iniciais (até duas) de um nome, ignorando pontuação; `?` quando não há letras. */
export function getInitials(name: string): string {
	return (
		name
			.replace(/[^\p{L}\p{N} ]/gu, "")
			.split(" ")
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join("") || "?"
	);
}

/**
 * Linha de uma lista de conversas. É um botão: `selected` marca a conversa
 * aberta (`aria-current`) e `unread` destaca as pendentes de leitura. Os dados
 * chegam prontos por props; o bloco não conhece mensagens nem canais.
 */
export function ConversationListItem({
	title,
	avatarFallback,
	timestamp,
	preview,
	previewIcon: PreviewIcon,
	meta,
	unread = false,
	selected = false,
	onSelect,
	className,
}: ConversationListItemProps) {
	return (
		<button
			type="button"
			onClick={onSelect}
			aria-current={selected ? "true" : undefined}
			className={cn(
				"flex w-full gap-2.5 border-b border-border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
				selected ? "bg-primary/10" : "hover:bg-muted/50",
				className,
			)}
		>
			<Avatar className="size-9 flex-none">
				<AvatarFallback>{avatarFallback}</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-1.5">
					<span className={cn("truncate text-[13px]", unread ? "font-bold" : "font-medium")}>
						{title}
					</span>
					{timestamp && (
						<span className="flex-none text-[11px] text-muted-foreground">{timestamp}</span>
					)}
				</div>
				{preview && (
					<div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
						{PreviewIcon && <PreviewIcon className="size-3 flex-none" />}
						<span className="truncate">{preview}</span>
					</div>
				)}
				{(meta || unread) && (
					<div className="mt-1.5 flex items-center gap-1.5">
						{meta}
						{unread && (
							<span
								role="img"
								aria-label="Não lida"
								className="ml-auto size-[7px] flex-none rounded-full bg-primary"
							/>
						)}
					</div>
				)}
			</div>
		</button>
	);
}
