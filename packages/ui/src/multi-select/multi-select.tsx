"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

import {
	type AdvancedOption,
	type BaseUiGroup,
	findOptionsByValues,
	hasGroups,
	sameOption,
	toBaseUiItems,
} from "../_internal/options";
import { cn } from "../utils/cn";
import type { MultiSelectProps } from "./multi-select.types";

/*
 * Seleção múltipla com busca, chips e grupos — componente ÚNICO que substitui
 * conceitualmente multi-select E GroupedMultiSelect do Portal-Aurora (19 telas).
 * Sobre o Combobox multiple do Base UI (sem cmdk, sem Radix): Chips/ChipRemove
 * nativos evitam botão-dentro-de-botão (a11y); popup permanece aberto durante
 * a seleção múltipla; filtro/teclado/ARIA vêm do primitivo.
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

export function MultiSelect({
	value,
	onValueChange,
	options,
	placeholder = "Selecione...",
	searchPlaceholder,
	emptyMessage = "Nenhuma opção encontrada",
	disabled = false,
	clearable = false,
	maxDisplay = 3,
	className,
	contentClassName,
	id,
	"aria-label": ariaLabel,
}: MultiSelectProps) {
	const items = React.useMemo(() => toBaseUiItems(options), [options]);
	const grouped = hasGroups(options);
	const selected = React.useMemo(() => findOptionsByValues(options, value), [options, value]);
	const visible = selected.slice(0, maxDisplay);
	const hidden = selected.length - visible.length;

	return (
		<ComboboxPrimitive.Root
			multiple
			items={items}
			value={selected}
			onValueChange={(next: AdvancedOption[]) => onValueChange(next.map((o) => o.value))}
			isItemEqualToValue={sameOption}
			openOnInputClick
			disabled={disabled}
		>
			<ComboboxPrimitive.Chips
				className={cn(
					"flex min-h-9 w-72 flex-wrap items-center gap-1 rounded-md border border-border bg-background py-1 pl-1.5 pr-1.5 text-sm shadow-sm transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10",
					disabled && "cursor-not-allowed opacity-50",
					className,
				)}
			>
				{visible.map((option) => (
					<ComboboxPrimitive.Chip
						key={option.value}
						className="flex items-center gap-1 rounded border border-primary/20 bg-primary/5 py-0.5 pl-2 pr-1 text-xs font-medium text-primary"
					>
						{option.label}
						{!disabled && (
							<ComboboxPrimitive.ChipRemove
								aria-label={`Remover ${option.label}`}
								className="flex size-4 items-center justify-center rounded-full outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
							>
								<X className="size-3" />
							</ComboboxPrimitive.ChipRemove>
						)}
					</ComboboxPrimitive.Chip>
				))}
				{hidden > 0 && (
					<span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
						+{hidden}
						<span className="sr-only"> outras {hidden} opções selecionadas</span>
					</span>
				)}
				<ComboboxPrimitive.Input
					id={id}
					aria-label={ariaLabel}
					placeholder={selected.length === 0 ? (placeholder ?? searchPlaceholder) : ""}
					className="h-6 min-w-16 flex-1 bg-transparent pl-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
				/>
				<span className="ml-auto flex shrink-0 items-center gap-0.5">
					{clearable && selected.length > 0 && !disabled && (
						<ComboboxPrimitive.Clear
							aria-label="Limpar seleção"
							className="flex size-6 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
						>
							<X className="size-3.5" />
						</ComboboxPrimitive.Clear>
					)}
					<ComboboxPrimitive.Trigger
						aria-label="Abrir opções"
						className="flex size-6 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ComboboxPrimitive.Icon>
							<ChevronDown className="size-4 opacity-60" />
						</ComboboxPrimitive.Icon>
					</ComboboxPrimitive.Trigger>
				</span>
			</ComboboxPrimitive.Chips>
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
