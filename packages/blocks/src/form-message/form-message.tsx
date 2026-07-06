import type * as React from "react";

import { cn } from "@supertrans-transportes/ui";

/*
 * Mensagem de apoio/validaÃ§Ã£o de formulÃ¡rio. Origem do padrÃ£o: os
 * `text-xs text-destructive` repetidos Ã  mÃ£o nos forms do Supertrans.
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
