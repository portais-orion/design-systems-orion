"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

import {
	type AdvancedOption,
	type BaseUiGroup,
	findOptionByValue,
	hasGroups,
	sameOption,
	toBaseUiItems,
} from "../_internal/options";
import { cn } from "../utils/cn";
import type { ComboboxProps } from "./combobox.types";

/*
 * Seleção única com busca, sobre o Combobox do Base UI (sem cmdk, sem Radix).
 * Referência de necessidade: Portal-Aurora multi-select em modo single e
 * selects longos. Padrão input-driven: o campo é o input de busca (decisão
 * documentada em docs/architecture/advanced-inputs.md). Filtro, teclado e
 * ARIA vêm do primitivo; itens { value, label } são reconhecidos nativamente.
 */
const itemClass =
	"relative flex cursor-default select-none flex-col gap-0.5 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

function OptionItem({ option }: { option: AdvancedOption }) {
	return (
		<ComboboxPrimitive.Item value={option} disabled={option.disabled} className={itemClass}>
			<span className="absolute left-2 top-2 flex size-3.5 items-center justify-center">
				<ComboboxPrimitive.ItemIndicator>
					<Check className="size-4 text-primary" />
				</ComboboxPrimitive.ItemIndicator>
			</span>
			<span>{option.label}</span>
			{option.description && (
				<span className="text-xs text-muted-foreground">{option.description}</span>
			)}
		</ComboboxPrimitive.Item>
	);
}

export function Combobox({
	value = null,
	onValueChange,
	options,
	placeholder = "Selecione...",
	searchPlaceholder,
	emptyMessage = "Nenhuma opção encontrada",
	disabled = false,
	clearable = false,
	className,
	contentClassName,
	id,
	"aria-label": ariaLabel,
}: ComboboxProps) {
	const items = React.useMemo(() => toBaseUiItems(options), [options]);
	const grouped = hasGroups(options);
	const selected = React.useMemo(() => findOptionByValue(options, value), [options, value]);

	return (
		<ComboboxPrimitive.Root
			items={items}
			value={selected}
			onValueChange={(next: AdvancedOption | null) => onValueChange(next?.value ?? null)}
			isItemEqualToValue={sameOption}
			openOnInputClick
			disabled={disabled}
		>
			<div
				className={cn(
					"flex h-9 w-64 items-center gap-1 rounded-md border border-border bg-background pl-3 pr-1.5 text-sm shadow-sm transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10",
					disabled && "cursor-not-allowed opacity-50",
					className,
				)}
			>
				<ComboboxPrimitive.Input
					id={id}
					aria-label={ariaLabel}
					placeholder={placeholder ?? searchPlaceholder}
					className="h-full w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
				/>
				{clearable && selected && !disabled && (
					<ComboboxPrimitive.Clear
						aria-label="Limpar seleção"
						className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<X className="size-3.5" />
					</ComboboxPrimitive.Clear>
				)}
				<ComboboxPrimitive.Trigger
					aria-label="Abrir opções"
					className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
				>
					<ComboboxPrimitive.Icon>
						<ChevronDown className="size-4 opacity-60" />
					</ComboboxPrimitive.Icon>
				</ComboboxPrimitive.Trigger>
			</div>
			<ComboboxPrimitive.Portal>
				<ComboboxPrimitive.Positioner sideOffset={4} className="z-50">
					<ComboboxPrimitive.Popup
						className={cn(
							"max-h-72 w-[var(--anchor-width)] min-w-40 overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
							contentClassName,
						)}
					>
						<ComboboxPrimitive.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
							{emptyMessage}
						</ComboboxPrimitive.Empty>
						<ComboboxPrimitive.List>
							{grouped
								? (group: BaseUiGroup) => (
										<ComboboxPrimitive.Group key={group.label} items={group.items}>
											<ComboboxPrimitive.GroupLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
												{group.label}
											</ComboboxPrimitive.GroupLabel>
											<ComboboxPrimitive.Collection>
												{(item: AdvancedOption) => <OptionItem key={item.value} option={item} />}
											</ComboboxPrimitive.Collection>
										</ComboboxPrimitive.Group>
									)
								: (item: AdvancedOption) => <OptionItem key={item.value} option={item} />}
						</ComboboxPrimitive.List>
					</ComboboxPrimitive.Popup>
				</ComboboxPrimitive.Positioner>
			</ComboboxPrimitive.Portal>
		</ComboboxPrimitive.Root>
	);
}
