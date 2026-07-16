"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Referência de API/uso: Portal-Aurora ui/switch.tsx
 * (Radix) — 15 telas consumidoras. Superfície pública idêntica (Switch único
 * com checked/onCheckedChange), o que facilita a migração futura do Aurora.
 */
/**
 * Alterna uma opção que vale imediatamente, sem confirmação. Quando a mudança
 * só se aplica após salvar o formulário, prefira `Checkbox`.
 */
const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitive.Root
		ref={ref}
		data-slot="switch"
		className={cn(
			"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[unchecked]:bg-input",
			className,
		)}
		{...props}
	>
		<SwitchPrimitive.Thumb
			className={cn(
				"pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 data-[unchecked]:translate-x-0",
			)}
		/>
	</SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };
