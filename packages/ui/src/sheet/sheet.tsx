"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Sheet/Drawer sobre o Dialog do Base UI (mesma base do dialog do núcleo),
 * com painel lateral por variant `side`. Sem equivalente direto nos portais —
 * padrão shadcn adaptado ao Base UI (Backdrop/Popup, render prop).
 */
/**
 * Painel que desliza a partir de uma borda da tela, para conteúdo auxiliar sem
 * trocar de página — filtros, detalhes ou navegação em telas estreitas. O lado
 * é escolhido em `SheetContent` pela prop `side`.
 */
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Backdrop>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Backdrop
		ref={ref}
		className={cn("fixed inset-0 z-50 bg-black/40 animate-in fade-in-0", className)}
		{...props}
	/>
));
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
	"fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg outline-none animate-in duration-300",
	{
		variants: {
			side: {
				right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-border slide-in-from-right",
				left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-border slide-in-from-left",
				top: "inset-x-0 top-0 border-b border-border slide-in-from-top",
				bottom: "inset-x-0 bottom-0 border-t border-border slide-in-from-bottom",
			},
		},
		defaultVariants: { side: "right" },
	},
);

const SheetContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup> & VariantProps<typeof sheetVariants>
>(({ className, children, side = "right", ...props }, ref) => (
	<SheetPortal>
		<SheetOverlay />
		<DialogPrimitive.Popup ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
			{children}
			{/* z-10: o conteúdo do sheet pode ter superfícies próprias (uma sidebar inteira,
			    por exemplo); o botão de fechar fica acima delas sem que o consumidor
			    precise alcançar este elemento por seletor de filho. */}
			<DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring">
				<X className="size-4" />
				<span className="sr-only">Fechar</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Popup>
	</SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col gap-1.5", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
		{...props}
	/>
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("text-lg font-semibold text-foreground", className)}
		{...props}
	/>
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
SheetDescription.displayName = "SheetDescription";

export {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
