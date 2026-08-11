import { AlertTriangle } from "lucide-react";
import type * as React from "react";

import { Button, cn } from "@design-systems-orion/ui";

import { toneClass } from "../_internal/tone";
import { useBlocksCopy } from "../copy";

/*
 * Extraído de registrar-demanda-form: estado de bloqueio quando cadastros
 * básicos necessários não existem — substitui o formulário/tela inteira.
 * Distinto de EmptyState/ErrorState (genéricos): este é especificamente
 * "pré-requisitos ausentes para continuar", com lista de ações corretivas.
 */
export type MissingPrerequisiteItem = {
	label: string;
	/** Ação livre por item (ex.: um Link do consumidor para a tela de cadastro). */
	action?: React.ReactNode;
};

export type MissingPrerequisitesStateProps = {
	title?: string;
	description?: React.ReactNode;
	items: MissingPrerequisiteItem[];
	onCancel?: () => void;
	cancelLabel?: string;
	className?: string;
};

/**
 * Estado de bloqueio quando cadastros básicos necessários não existem. A
 * ação de cada item (link de cadastro) é fornecida pelo consumidor via
 * `action` — este bloco não conhece rotas.
 */
export function MissingPrerequisitesState({
	title,
	description,
	items,
	onCancel,
	cancelLabel,
	className,
}: MissingPrerequisitesStateProps) {
	const copy = useBlocksCopy();

	return (
		<div
			className={cn("mx-auto max-w-2xl rounded-xl p-8", toneClass("warning", "surface"), className)}
		>
			<div className="flex items-start gap-4">
				<div className={cn("mt-0.5 rounded-full p-2", toneClass("warning", "solid"))}>
					<AlertTriangle className="size-5" />
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold">
						{title ?? copy.states.missingPrerequisitesTitle}
					</h3>
					<p className="mt-2">{description ?? copy.states.missingPrerequisitesDescription}</p>
					<ul className="mt-4 list-disc space-y-2 pl-5">
						{items.map((item) => (
							<li key={item.label}>
								<strong>{item.label}</strong>
								{item.action && <> — {item.action}</>}
							</li>
						))}
					</ul>
					{onCancel && (
						<div className="mt-6 flex justify-end">
							<Button
								type="button"
								variant="outline"
								onClick={onCancel}
								className={toneClass("warning", "border")}
							>
								{cancelLabel ?? copy.states.back}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
