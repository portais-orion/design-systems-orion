import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

import { toneClass } from "../_internal/tone";

/*
 * Mensagem de apoio/validação de formulário. Origem do padrão: os
 * `text-xs text-destructive` repetidos à mão nos forms do Supertrans.
 */
export type FormMessageTone = "default" | "error" | "warning" | "success";

export type FormMessageProps = {
	tone?: FormMessageTone;
	children: React.ReactNode;
	className?: string;
	id?: string;
};


/**
 * Mensagem de apoio ou validação sob um campo. Com `tone="error"` vira
 * `role="alert"` e é anunciada de imediato; ligue o `id` ao
 * `aria-describedby` do campo para associar mensagem e controle.
 */
export function FormMessage({ tone = "default", children, className, id }: FormMessageProps) {
	return (
		<p
			id={id}
			role={tone === "error" ? "alert" : undefined}
			className={cn("text-xs", toneClass(tone, "text"), className)}
		>
			{children}
		</p>
	);
}
