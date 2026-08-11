"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { Input, cn } from "@design-systems-orion/ui";

/*
 * Recriado a partir do Portal-Aurora ui/DataTable/SearchBar.tsx, com API
 * controlada (value/onChange) em vez de submit imperativo. Debounce
 * implementado: onDebouncedChange dispara debounceMs (default 300ms) após a
 * última digitação; onChange dispara a cada tecla.
 */
export type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	onDebouncedChange?: (value: string) => void;
	className?: string;
};

/**
 * Campo de busca controlado, com ícone e botão de limpar. `onChange` dispara a
 * cada tecla; `onDebouncedChange` espera `debounceMs` após a última digitação —
 * use este último para não disparar uma requisição por caractere.
 */
export function SearchBar({
	value,
	onChange,
	placeholder = "Buscar...",
	debounceMs = 300,
	onDebouncedChange,
	className,
}: SearchBarProps) {
	const debouncedRef = React.useRef(onDebouncedChange);
	debouncedRef.current = onDebouncedChange;

	React.useEffect(() => {
		if (!debouncedRef.current) return;
		const t = setTimeout(() => debouncedRef.current?.(value), debounceMs);
		return () => clearTimeout(t);
	}, [value, debounceMs]);

	return (
		<div className={cn("relative", className)}>
			<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="text"
				role="searchbox"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				className="pl-9 pr-9"
			/>
			{value !== "" && (
				<button
					type="button"
					aria-label="Limpar busca"
					onClick={() => onChange("")}
					className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
				>
					<X className="size-3.5" />
				</button>
			)}
		</div>
	);
}
