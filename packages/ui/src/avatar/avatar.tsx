"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Imagem circular de identificação de uma pessoa ou entidade. Use como raiz de
 * `AvatarImage` e `AvatarFallback` — o fallback aparece enquanto a imagem
 * carrega ou quando ela falha.
 */
const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
		{...props}
	/>
));
Avatar.displayName = "Avatar";

/** Imagem do `Avatar`. Ao falhar o carregamento, cede lugar ao `AvatarFallback`. */
const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = "AvatarImage";

/** Conteúdo exibido quando não há imagem — normalmente as iniciais do nome. */
const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-muted",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
