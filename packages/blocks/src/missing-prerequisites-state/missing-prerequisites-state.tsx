import { AlertTriangle } from "lucide-react";
import type * as React from "react";

import { Button, cn } from "@design-systems-orion/ui";

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
	title = "Cadastros incompletos",
	description = "Para continuar, é necessário que os seguintes cadastros possuam pelo menos um registro no sistema:",
	items,
	onCancel,
	cancelLabel = "Voltar",
	className,
}: MissingPrerequisitesStateProps) {
	return (
		<div
			className={cn(
				"mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-8",
				className,
			)}
		>
			<div className="flex items-start gap-4">
				<div className="mt-0.5 rounded-full bg-amber-100 p-2">
					<AlertTriangle className="size-5 text-amber-600" />
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-amber-800">{title}</h3>
					<p className="mt-2 text-amber-700">{description}</p>
					<ul className="mt-4 list-disc space-y-2 pl-5 text-amber-700">
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
								className="border-amber-300 text-amber-800 hover:bg-amber-100"
							>
								{cancelLabel}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
