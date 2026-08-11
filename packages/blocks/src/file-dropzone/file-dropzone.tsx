"use client";

import { UploadCloud } from "lucide-react";
import * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Extraído de 4 pontos do Supertrans (import-csv-modal, ContainerInspection
 * ImportDialog, consulta-di-client, registrar-demanda-form): zona de upload
 * com borda tracejada, ícone central e destaque ao arrastar arquivo por cima.
 * Presentational — entrega os `File[]` e não sabe validar/enviar nada.
 */
export type FileDropzoneProps = {
	onFilesSelected: (files: File[]) => void;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	icon?: React.ComponentType<{ className?: string }>;
	title?: string;
	description?: string;
	className?: string;
};

/**
 * Zona de arraste-e-solte (ou clique) para seleção de arquivo(s). Só entrega
 * `File[]` via `onFilesSelected` — validação de tipo/tamanho e upload em si
 * ficam a cargo do consumidor.
 */
export function FileDropzone({
	onFilesSelected,
	accept,
	multiple = false,
	disabled = false,
	icon: Icon = UploadCloud,
	title = "Clique para fazer upload",
	description,
	className,
}: FileDropzoneProps) {
	const inputId = React.useId();
	const [isDragging, setIsDragging] = React.useState(false);

	function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;
		onFilesSelected(Array.from(fileList));
	}

	return (
		<label
			htmlFor={inputId}
			onDragOver={(event) => {
				event.preventDefault();
				if (!disabled) setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={(event) => {
				event.preventDefault();
				setIsDragging(false);
				if (!disabled) handleFiles(event.dataTransfer.files);
			}}
			className={cn(
				"flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
				isDragging
					? "border-primary bg-primary/5"
					: "border-muted-foreground/25 bg-muted/20 hover:bg-muted/50",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
		>
			<Icon className="mb-4 size-10 text-muted-foreground" />
			<p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
			{description && <p className="text-xs text-muted-foreground">{description}</p>}
			<input
				id={inputId}
				type="file"
				accept={accept}
				multiple={multiple}
				disabled={disabled}
				className="hidden"
				onChange={(event) => handleFiles(event.target.files)}
			/>
		</label>
	);
}
