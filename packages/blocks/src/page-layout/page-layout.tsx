import type * as React from "react";

import { cn } from "@portais-orion/ui";

/*
 * Layout base de página (sem shell/sidebar/breadcrumb � Sprint 6).
 * Padrão de espaçamento observado nos dois portais: pilha space-y-6.
 */
export type PageLayoutProps = {
	header?: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
	contentClassName?: string;
	maxWidth?: "none" | "screen-xl" | "screen-2xl";
};

const maxWidthClass = {
	none: "",
	"screen-xl": "mx-auto w-full max-w-screen-xl",
	"screen-2xl": "mx-auto w-full max-w-screen-2xl",
} as const;

export function PageLayout({
	header,
	children,
	footer,
	className,
	contentClassName,
	maxWidth = "none",
}: PageLayoutProps) {
	return (
		<div className={cn("space-y-6 p-6", maxWidthClass[maxWidth], className)}>
			{header}
			<div className={cn("space-y-6", contentClassName)}>{children}</div>
			{footer}
		</div>
	);
}
