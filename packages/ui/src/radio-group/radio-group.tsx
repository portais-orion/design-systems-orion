"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI (RadioGroup + Radio). Referência de API: Portal-Aurora
 * ui/radio-group.tsx (Radix, 2 telas). Superfície shadcn: RadioGroup +
 * RadioGroupItem, controlado por value/onValueChange.
 */
/**
 * Escolha de exatamente uma opção entre poucas, todas visíveis ao mesmo tempo.
 * Controle com `value` e `onValueChange`. Se as opções não couberem na tela,
 * prefira `Select`.
 */
const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>
>(({ className, ...props }, ref) => (
	<RadioGroupPrimitive ref={ref} className={cn("grid gap-2", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

/** Uma opção do `RadioGroup`. Exige `value` único dentro do grupo. */
const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>
>(({ className, ...props }, ref) => (
	<RadioPrimitive.Root
		ref={ref}
		className={cn(
			"aspect-square size-4 shrink-0 rounded-full border border-border bg-background outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary",
			className,
		)}
		{...props}
	>
		<RadioPrimitive.Indicator className="flex items-center justify-center data-[unchecked]:hidden">
			<span className="size-2 rounded-full bg-primary" />
		</RadioPrimitive.Indicator>
	</RadioPrimitive.Root>
));
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
