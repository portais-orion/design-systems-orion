"use client";

import type * as React from "react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	cn,
} from "@portais-orion/ui";

/*
 * Origem: portal-supertrans components/home/configurador-onboarding.tsx. O
 * original persistia em localStorage e decidia sozinho quando abrir — aqui o
 * bloco é controlado (`open`/`onOpenChange`): quem decide se já foi visto e
 * onde persistir isso é o consumidor.
 */
export type OnboardingStepTone = "default" | "info" | "success" | "warning";

const circleClassByTone: Record<OnboardingStepTone, string> = {
	default: "bg-muted text-muted-foreground",
	info: "bg-sky-100 text-sky-600",
	success: "bg-emerald-100 text-emerald-600",
	warning: "bg-amber-100 text-amber-600",
};

export type OnboardingStep = {
	title: string;
	description: string;
	/** Cor do círculo numerado. */
	tone?: OnboardingStepTone;
};

export type OnboardingDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	/** Numerados automaticamente 1..n na ordem do array. */
	steps: OnboardingStep[];
	confirmLabel?: string;
	onConfirm: () => void;
	className?: string;
};

/**
 * Modal de primeiro acesso com passos numerados. Controlado: o consumidor
 * decide quando abrir (ex.: primeira visita, feature nova) e onde persistir
 * que o usuário já viu — o bloco não fala com `localStorage` nem nada externo.
 */
export function OnboardingDialog({
	open,
	onOpenChange,
	title,
	description,
	icon: Icon,
	steps,
	confirmLabel = "Começar a usar",
	onConfirm,
	className,
}: OnboardingDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("max-w-md", className)}>
				<DialogHeader>
					{Icon && (
						<div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
							<Icon className="size-6 text-primary" />
						</div>
					)}
					<DialogTitle className="text-center text-xl">{title}</DialogTitle>
					{description && (
						<DialogDescription className="text-center">{description}</DialogDescription>
					)}
				</DialogHeader>

				<div className="space-y-4 py-4">
					{steps.map((step, index) => (
						<div key={step.title} className="flex gap-3">
							<div
								className={cn(
									"flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
									circleClassByTone[step.tone ?? "default"],
								)}
							>
								{index + 1}
							</div>
							<div>
								<h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
								<p className="text-sm text-muted-foreground">{step.description}</p>
							</div>
						</div>
					))}
				</div>

				<DialogFooter>
					<Button className="w-full" onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
