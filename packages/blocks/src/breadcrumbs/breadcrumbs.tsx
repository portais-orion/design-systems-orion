import { ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@supertrans-transportes/ui";

import type { BreadcrumbItem, RenderLink } from "../navigation";

/*
 * Breadcrumbs do chrome (parte do shell, nÃ£o dos page layouts).
 * Origem visual: admin/breadcrumbs.tsx do Supertrans â€” desacoplado de
 * rotas/permissÃµes: itens por dados, link via renderLink injetado.
 */
export type BreadcrumbsProps = {
	items: BreadcrumbItem[];
	renderLink?: RenderLink;
	separator?: React.ReactNode;
	className?: string;
};

const defaultRenderLink: RenderLink = ({ href, children, className, ...props }) => (
	<a href={href} className={className} {...props}>
		{children}
	</a>
);

export function Breadcrumbs({ items, renderLink, separator, className }: BreadcrumbsProps) {
	if (items.length === 0) return null;
	const link = renderLink ?? defaultRenderLink;
	const sep = separator ?? <ChevronRight aria-hidden="true" className="size-3.5 opacity-50" />;

	return (
		<nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
			<ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const isCurrent = item.current ?? isLast;
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: trilha Ã© posicional e estÃ¡tica por render
						<li key={index} className="flex min-w-0 items-center gap-1.5">
							{index > 0 && sep}
							{item.href && !isCurrent ? (
								link({
									href: item.href,
									children: item.label,
									className:
										"truncate rounded outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
								})
							) : (
								<span
									aria-current={isCurrent ? "page" : undefined}
									className={cn("truncate", isCurrent && "font-medium text-foreground")}
								>
									{item.label}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
