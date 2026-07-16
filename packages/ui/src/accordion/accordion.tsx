"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Sem equivalente nos portais (padrão shadcn adaptado):
 * Trigger/Content públicos mapeiam para Trigger/Panel do Base UI.
 * type="single" → openMultiple={false}; "multiple" → default do Base UI.
 */
type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

/**
 * Lista de seções expansíveis. `type="single"` (padrão) mantém apenas uma
 * seção aberta; `type="multiple"` permite várias. Componha com `AccordionItem`,
 * `AccordionTrigger` e `AccordionContent`.
 */
const Accordion = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Root>,
	Omit<AccordionRootProps, "multiple" | "className"> & {
		/** `single` mantém uma seção aberta por vez; `multiple` permite várias. */
		type?: "single" | "multiple";
		className?: string;
	}
>(({ className, type = "single", ...props }, ref) => (
	<AccordionPrimitive.Root
		ref={ref}
		multiple={type === "multiple"}
		className={cn("w-full", className)}
		{...props}
	/>
));
Accordion.displayName = "Accordion";

/** Uma seção do `Accordion`. Exige `value` único dentro da lista. */
const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b border-border", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

/** Cabeçalho clicável que abre e fecha o `AccordionItem`. A seta é automática. */
const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"group/accordion flex flex-1 items-center justify-between py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/accordion:rotate-180" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/** Conteúdo revelado ao abrir o `AccordionItem`. */
const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Panel>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Panel>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Panel
		ref={ref}
		className={cn("overflow-hidden pb-4 text-sm text-muted-foreground", className)}
		{...props}
	>
		{children}
	</AccordionPrimitive.Panel>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
