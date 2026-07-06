import type * as React from "react";

import { cn } from "@portais-orion/ui";

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

const toneClass: Record<FormMessageTone, string> = {
	default: "text-muted-foreground",
	error: "text-destructive",
	warning: "text-amber-600",
	success: "text-emerald-600",
};

export function FormMessage({ tone = "default", children, className, id }: FormMessageProps) {
	return (
		<p
			id={id}
			role={tone === "error" ? "alert" : undefined}
			className={cn("text-xs", toneClass[tone], className)}
		>
			{children}
		</p>
	);
}
