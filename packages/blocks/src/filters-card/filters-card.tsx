"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import * as React from "react";

import {
	AnimatePresence,
	OrionMotionBoundary,
	m,
	useMotionTokens,
	useOrionMotionReady,
	usePresence,
} from "@design-systems-orion/motion/motion";
import { useMotionMode, useMotionPolicy } from "@design-systems-orion/motion/react";
import { Button, Card, CardContent, cn } from "@design-systems-orion/ui";

import { BAND_TOP_CLASS } from "../_internal/page-regions";
import { useBlocksCopy } from "../copy";

/*
 * Card de filtros colapsável para listagens CRUD: título com ícone + toggle
 * Mostrar/Ocultar, corpo por slot (busca + selects) e footer com "Limpar filtros".
 * Estado interno (não-controlado) ou controlado via open/onOpenChange.
 * Presentational — não conhece os filtros, só os renderiza.
 */
export type FiltersCardProps = {
	title?: string;
	icon?: React.ComponentType<{ className?: string }>;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	onClear?: () => void;
	clearLabel?: string;
	/** Controles de filtro (SearchBar, selects, etc.). */
	children: React.ReactNode;
	/** Ações extras no footer, à esquerda do "Limpar". */
	footer?: React.ReactNode;
	className?: string;
};

/**
 * Card colapsável que abriga os controles de filtro de uma listagem. Não conhece
 * os filtros: renderiza o que vier em `children` e avisa por `onClear`. Funciona
 * não-controlado (`defaultOpen`) ou controlado (`open` + `onOpenChange`).
 */
export function FiltersCard({
	title,
	icon: Icon = Filter,
	defaultOpen = true,
	open,
	onOpenChange,
	onClear,
	clearLabel,
	children,
	footer,
	className,
}: FiltersCardProps) {
	const copy = useBlocksCopy();
	const mode = useMotionMode();
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internalOpen;
	const toggleRef = React.useRef<HTMLButtonElement>(null);
	const cardRef = React.useRef<HTMLDivElement>(null);
	const tokens = useMotionTokens(cardRef);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const focusedInside = React.useRef(false);
	const wasOpen = React.useRef(isOpen);
	const contentId = React.useId();
	React.useLayoutEffect(() => {
		if (wasOpen.current && !isOpen && focusedInside.current) {
			toggleRef.current?.focus();
			focusedInside.current = false;
		}
		wasOpen.current = isOpen;
	}, [isOpen]);

	const toggle = () => {
		const next = !isOpen;
		if (!isControlled) setInternalOpen(next);
		onOpenChange?.(next);
	};

	return (
		<Card ref={cardRef} className={cn("overflow-hidden", className)}>
			<div className="flex items-center justify-between gap-3 px-6 py-4">
				<div className="flex items-center gap-2 text-sm font-semibold text-foreground">
					<Icon className="size-4 text-muted-foreground" />
					{title ?? copy.filters.title}
				</div>
				<Button
					ref={toggleRef}
					variant="ghost"
					size="sm"
					onClick={toggle}
					aria-expanded={isOpen}
					aria-controls={isOpen ? contentId : undefined}
				>
					{isOpen ? copy.filters.hide : copy.filters.show}
					<ChevronDown
						className={cn(
							mode === "off" || mode === "reduced"
								? "transition-none"
								: "transition-transform duration-(--motion-duration-fast) motion-reduce:transition-none",
							isOpen && "rotate-180",
						)}
					/>
				</Button>
			</div>

			<OrionMotionBoundary>
				<AnimatePresence initial={false}>
					{isOpen && (
						<FiltersPanel
							key="filters"
							id={contentId}
							contentRef={contentRef}
							tokens={tokens}
							onFocus={() => {
								focusedInside.current = true;
							}}
							onBlur={(event) => {
								if (!event.currentTarget.contains(event.relatedTarget as Node | null))
									focusedInside.current = false;
							}}
						>
							<CardContent className="pt-0">{children}</CardContent>
							{(onClear || footer) && (
								<div
									className={cn("flex items-center justify-end gap-2 px-6 py-3", BAND_TOP_CLASS)}
								>
									{footer}
									{onClear && (
										<Button variant="ghost" size="sm" onClick={onClear}>
											<X />
											{clearLabel ?? copy.filters.clear}
										</Button>
									)}
								</div>
							)}
						</FiltersPanel>
					)}
				</AnimatePresence>
			</OrionMotionBoundary>
		</Card>
	);
}

function FiltersPanel({
	children,
	contentRef,
	tokens,
	id,
	onFocus,
	onBlur,
}: {
	children: React.ReactNode;
	contentRef: React.RefObject<HTMLDivElement | null>;
	tokens: ReturnType<typeof useMotionTokens>;
	id: string;
	onFocus: React.FocusEventHandler<HTMLDivElement>;
	onBlur: React.FocusEventHandler<HTMLDivElement>;
}) {
	const { enabled, reduceMotion } = useMotionPolicy();
	const ready = useOrionMotionReady();
	const [present, safeToRemove] = usePresence();
	const animate = enabled && ready && !reduceMotion;
	React.useEffect(() => {
		if (!present && !animate) safeToRemove?.();
	}, [present, animate, safeToRemove]);
	return (
		<m.div
			ref={contentRef}
			id={id}
			inert={!present}
			onFocusCapture={onFocus}
			onBlurCapture={onBlur}
			className="overflow-hidden"
			initial={animate ? { height: 0, opacity: 0 } : false}
			animate={{ height: "auto", opacity: 1 }}
			exit={animate ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
			transition={{ duration: animate ? tokens.panel : 0, ease: tokens.ease }}
			onAnimationComplete={() => {
				if (!present) safeToRemove?.();
			}}
		>
			<fieldset disabled={!present} className="m-0 min-w-0 border-0 p-0">
				{children}
			</fieldset>
		</m.div>
	);
}
