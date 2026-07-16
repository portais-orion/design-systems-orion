"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import * as React from "react";

import { buttonVariants } from "../button";
import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Referência de API: Portal-Aurora ui/alert-dialog.tsx
 * (shadcn/Radix). Mapeamento Base UI: Overlay→Backdrop, Content→Popup.
 * Action/Cancel usam buttonVariants para consistência com o Button do núcleo.
 */
/**
 * Modal que exige uma decisão antes de prosseguir, para ações destrutivas ou
 * irreversíveis. Diferente do `Dialog`, não fecha ao clicar fora nem no Esc: a
 * saída é sempre por `AlertDialogAction` ou `AlertDialogCancel`.
 */
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Backdrop>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Backdrop
		ref={ref}
		className={cn("fixed inset-0 z-50 bg-black/40 animate-in fade-in-0", className)}
		{...props}
	/>
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Popup>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Popup
			ref={ref}
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-xl",
				className,
			)}
			{...props}
		/>
	</AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={cn("text-lg font-semibold", className)}
		{...props}
	/>
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Close ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Close>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Close
		ref={ref}
		className={cn(buttonVariants({ variant: "outline" }), className)}
		{...props}
	/>
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
