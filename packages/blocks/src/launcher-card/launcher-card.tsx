"use client";

import * as React from "react";

import {
	OrionMotionBoundary,
	m,
	useMotionTokens,
	useOrionMotionReady,
} from "@design-systems-orion/motion/motion";
import { useMotionMode, useMotionPolicy } from "@design-systems-orion/motion/react";
import { Card, cn } from "@design-systems-orion/ui";

/*
 * Card de lançador de módulo (grid de home/launcher): ícone no topo, título forte,
 * descrição curta e CTA textual no rodapé. Altura mínima para grid uniforme.
 * Presentational — não conhece rota. Navegação via onClick (o consumidor usa seu
 * router) ou envolvendo o conteúdo com seu próprio link.
 */
export type LauncherCardProps = {
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	/** CTA textual no rodapé (ex.: "Abrir →"). */
	cta?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

/**
 * Card de entrada para um módulo, usado nas grades de home. Não conhece rota:
 * passe `onClick` (e navegue com o router do consumidor) ou envolva o card com
 * o seu próprio link. Com `onClick`, renderiza um `<button>`.
 */
export function LauncherCard({
	title,
	description,
	icon: Icon,
	cta,
	onClick,
	className,
}: LauncherCardProps) {
	return (
		<OrionMotionBoundary>
			<LauncherCardSurface
				title={title}
				description={description}
				icon={Icon}
				cta={cta}
				onClick={onClick}
				className={className}
			/>
		</OrionMotionBoundary>
	);
}

function LauncherCardSurface({
	title,
	description,
	icon: Icon,
	cta,
	onClick,
	className,
}: LauncherCardProps) {
	const { enabled, reduceMotion } = useMotionPolicy();
	const mode = useMotionMode();
	const ready = useOrionMotionReady();
	const ref = React.useRef<HTMLDivElement>(null);
	const tokens = useMotionTokens(ref);
	const animate = enabled && ready && !reduceMotion;
	const feedback = {
		initial: false as const,
		animate: animate ? { y: [tokens.distance, 0] } : { y: 0 },
		whileHover: animate ? { y: -tokens.distance } : { y: 0 },
		whileTap: animate ? { y: 0 } : undefined,
		transition: { duration: animate ? tokens.fast : 0, ease: tokens.ease },
	};
	const body = (
		<m.div
			ref={ref}
			className="flex h-full flex-col gap-3 p-5 text-left"
			{...(!onClick ? feedback : {})}
		>
			{Icon && (
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Icon className="size-5" />
				</div>
			)}
			<div className="min-w-0 flex-1 space-y-1">
				<p className="font-semibold text-foreground">{title}</p>
				{description && <p className="text-sm text-muted-foreground">{description}</p>}
			</div>
			{cta && <div className="pt-1 text-sm font-medium text-primary">{cta}</div>}
		</m.div>
	);

	if (onClick) {
		return (
			<m.button
				type="button"
				onClick={onClick}
				className={cn(
					"flex min-h-36 rounded-xl border border-border bg-card text-card-foreground shadow-sm outline-none hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
					mode === "off"
						? "transition-none"
						: enabled
							? "transition-[border-color,box-shadow] duration-(--motion-duration-fast)"
							: "transition-all motion-reduce:transition-none",
					className,
				)}
				{...feedback}
			>
				{body}
			</m.button>
		);
	}

	return (
		<Card
			className={cn(
				"min-h-36 p-0 hover:shadow-md",
				mode === "off" ? "transition-none" : "transition-shadow motion-reduce:transition-none",
				className,
			)}
		>
			{body}
		</Card>
	);
}
