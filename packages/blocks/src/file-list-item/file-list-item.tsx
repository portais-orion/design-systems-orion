import { File as FileIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@portais-orion/ui";

/*
 * Extraído de ContainerInspectionImportDialog / registrar-demanda-form:
 * card do arquivo selecionado, pendente de envio, com remoção. Complementa o
 * FileDropzone (que só entrega os File[] escolhidos).
 */
export type FileListItemProps = {
	name: string;
	/** Já formatado (ex.: "1.4 KB") ou tamanho em bytes (formata em KB automaticamente). */
	size?: string | number;
	icon?: React.ComponentType<{ className?: string }>;
	onRemove?: () => void;
	removeLabel?: string;
	className?: string;
};

function formatSize(size: FileListItemProps["size"]): string | undefined {
	if (size === undefined) return undefined;
	if (typeof size === "string") return size;
	return `${(size / 1024).toFixed(1)} KB`;
}

/**
 * Card de arquivo selecionado (antes do envio): ícone, nome, tamanho e
 * remoção opcional. Não faz upload nem valida — só exibe o que o consumidor
 * já tem em estado local.
 */
export function FileListItem({
	name,
	size,
	icon: Icon = FileIcon,
	onRemove,
	removeLabel = "Remover",
	className,
}: FileListItemProps) {
	const sizeLabel = formatSize(size);
	return (
		<div
			className={cn(
				"flex w-full items-center justify-between rounded-lg border border-border p-4",
				className,
			)}
		>
			<div className="flex min-w-0 items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
					<Icon className="size-5" />
				</div>
				<div className="min-w-0">
					<p className="truncate text-sm font-medium text-foreground">{name}</p>
					{sizeLabel && <p className="text-xs text-muted-foreground">{sizeLabel}</p>}
				</div>
			</div>
			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="shrink-0 text-sm font-medium text-destructive hover:underline"
				>
					{removeLabel}
				</button>
			)}
		</div>
	);
}
