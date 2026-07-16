"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Seleção de uma opção entre poucas, a partir de uma lista fechada. Quando a
 * lista é longa e pede busca, use `Combobox`; para várias opções ao mesmo
 * tempo, `MultiSelect`.
 */
const Select = SelectPrimitive.Root;
const SelectValue = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Value>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> & {
		items?: { value: string; label: string }[];
	}
>(({ className, items, placeholder, ...props }, ref) => (
	<SelectPrimitive.Value
		ref={ref}
		className={cn("block truncate", className)}
		placeholder={placeholder}
		{...props}
	>
		{(value) => {
			if (!value && placeholder) return placeholder;
			if (items) {
				const item = items.find((i) => i.value === value);
				if (item) return item.label;
			}
			return value;
		}}
	</SelectPrimitive.Value>
));
SelectValue.displayName = "SelectValue";

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex h-9 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors hover:bg-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon className="flex shrink-0">
			<ChevronDown className="size-3.5 text-muted-foreground opacity-50" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectPortal = SelectPrimitive.Portal;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup> & {
		position?: "popper" | "item-aligned";
	}
>(({ className, children, position = "popper", ...props }, ref) => (
	<SelectPortal>
		<SelectPrimitive.Positioner className="z-50 min-w-[var(--anchor-width)]" sideOffset={4}>
			<SelectPrimitive.Popup
				ref={ref}
				className={cn(
					"relative overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			>
				<SelectPrimitive.List className="p-1 outline-none">{children}</SelectPrimitive.List>
			</SelectPrimitive.Popup>
		</SelectPrimitive.Positioner>
	</SelectPortal>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm outline-none transition-colors focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="size-3.5 text-primary" />
				</SelectPrimitive.ItemIndicator>
			</span>
		</SelectPrimitive.Item>
	);
});
SelectItem.displayName = "SelectItem";

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
