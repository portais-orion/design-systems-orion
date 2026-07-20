import { Plus, X } from "lucide-react";
import type * as React from "react";

import { Button, cn } from "@portais-orion/ui";

/*
 * Extraído de registrar-demanda-form (lista de containers), scenarios-form e
 * menu-customizado-form (todos com `useFieldArray`): linhas de formulário
 * repetíveis com círculo numerado, conteúdo por linha e remoção.
 */
export type DynamicFieldListRowsProps = {
	/** Quantidade atual de linhas. */
	count: number;
	/** Renderiza o conteúdo (inputs) de uma linha pelo índice. */
	renderRow: (index: number) => React.ReactNode;
	onRemove: (index: number) => void;
	onAdd: () => void;
	addLabel?: string;
	removeLabel?: string;
	canRemove?: (index: number) => boolean;
	className?: string;
};

/**
 * Linhas de formulário repetíveis (padrão `useFieldArray`): círculo numerado,
 * conteúdo da linha por render-prop, remoção por linha e "Adicionar" no
 * rodapé. Não conhece o formulário — só a estrutura visual da lista.
 */
export function DynamicFieldListRows({
	count,
	renderRow,
	onRemove,
	onAdd,
	addLabel = "Adicionar",
	removeLabel = "Remover linha",
	canRemove = () => true,
	className,
}: DynamicFieldListRowsProps) {
	return (
		<div className={cn("space-y-3", className)}>
			{Array.from({ length: count }, (_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: linhas repetíveis não têm id estável neste nível
				<div key={index} className="flex items-start gap-3">
					<div className="mt-1.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
						{index + 1}
					</div>
					<div className="min-w-0 flex-1">{renderRow(index)}</div>
					{canRemove(index) && (
						<button
							type="button"
							onClick={() => onRemove(index)}
							aria-label={removeLabel}
							className="mt-1.5 shrink-0 text-muted-foreground hover:text-destructive"
						>
							<X className="size-4" />
						</button>
					)}
				</div>
			))}
			<Button type="button" variant="outline" size="sm" onClick={onAdd}>
				<Plus />
				{addLabel}
			</Button>
		</div>
	);
}
