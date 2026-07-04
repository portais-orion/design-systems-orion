"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Referência de API: Portal-Aurora ui/scroll-area.tsx
 * (Radix, 7 telas). Scrollbar estilizada por tokens; conteúdo permanece
 * acessível (overflow nativo no Viewport).
 */
const ScrollArea = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<ScrollAreaPrimitive.Root
		ref={ref}
		className={cn("relative overflow-hidden", className)}
		{...props}
	>
		<ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollBar orientation="horizontal" />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.Scrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none p-px transition-colors",
			orientation === "vertical" && "w-2.5",
			orientation === "horizontal" && "h-2.5 flex-col",
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
	</ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
