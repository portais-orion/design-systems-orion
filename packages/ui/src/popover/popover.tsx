"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Referência de API: Portal-Aurora ui/popover.tsx
 * (Radix, 5 telas). Polimorfismo via `render` (padrão do núcleo), não asChild.
 */
/**
 * Painel flutuante ancorado a um gatilho, para conteúdo secundário e
 * interativo. Para texto curto e apenas informativo use `Tooltip`; para uma
 * lista de ações, `DropdownMenu`.
 */
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Popup> & {
		sideOffset?: number;
		align?: "start" | "center" | "end";
	}
>(({ className, sideOffset = 6, align = "center", ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Positioner sideOffset={sideOffset} align={align} className="z-50">
			<PopoverPrimitive.Popup
				ref={ref}
				className={cn(
					"w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Positioner>
	</PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
