"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";
import { cn } from "../utils/cn";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipPortal = TooltipPrimitive.Portal;

const TooltipTrigger = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TooltipPrimitive.Trigger
		ref={ref as React.Ref<HTMLButtonElement>}
		className={cn(className)}
		{...props}
	/>
));
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> & {
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
	}
>(({ className, side = "top", sideOffset = 4, ...props }, ref) => (
	<TooltipPortal>
		<TooltipPrimitive.Positioner side={side} sideOffset={sideOffset}>
			<TooltipPrimitive.Popup
				ref={ref}
				className={cn(
					"z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</TooltipPrimitive.Positioner>
	</TooltipPortal>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
