"use client";

import { Send } from "lucide-react";
import * as React from "react";

import { Button, Textarea, cn } from "@design-systems-orion/ui";

/*
 * Extraído do campo de resposta da Central de Atendimento do portal-supertrans:
 * textarea que envia com Enter (Shift+Enter quebra linha) e botão de envio.
 */
export type MessageComposerProps = {
	value: string;
	onValueChange: (value: string) => void;
	/** Disparado ao enviar com Enter ou pelo botão. Não dispara com texto vazio ou `sending`. */
	onSend: () => void;
	/** Envio em andamento: bloqueia novo envio. */
	sending?: boolean;
	disabled?: boolean;
	placeholder?: string;
	sendLabel?: string;
	className?: string;
};

/**
 * Campo de resposta de uma conversa, controlado. Enter envia, Shift+Enter
 * quebra linha, e a composição por IME (acentos, CJK) não dispara envio. Quem
 * limpa o texto depois de enviar é o consumidor, ao confirmar o sucesso.
 */
export function MessageComposer({
	value,
	onValueChange,
	onSend,
	sending = false,
	disabled = false,
	placeholder = "Escreva uma mensagem... (Enter envia, Shift+Enter quebra linha)",
	sendLabel = "Enviar",
	className,
}: MessageComposerProps) {
	const canSend = value.trim().length > 0 && !sending && !disabled;

	return (
		<div className={cn("flex items-end gap-2 border-t border-border bg-card px-6 py-3", className)}>
			<Textarea
				rows={1}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				aria-label={placeholder}
				onChange={(event) => onValueChange(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
						event.preventDefault();
						if (canSend) onSend();
					}
				}}
				className="max-h-32 min-h-10 resize-none"
			/>
			<Button className="gap-1.5" disabled={!canSend} onClick={onSend}>
				<Send className="size-4" />
				{sendLabel}
			</Button>
		</div>
	);
}
