import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Superfície elevada que agrupa conteúdo relacionado. Componha com
 * `CardHeader`, `CardContent` e `CardFooter`; o padding é responsabilidade
 * dessas partes, não da raiz.
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"rounded-xl border border-border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		/>
	),
);
Card.displayName = "Card";

/** Topo do `Card`. Empilha `CardTitle` e `CardDescription`. */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
	),
);
CardHeader.displayName = "CardHeader";

/** Título do `Card`. Renderiza uma `div`: escolha o nível semântico no consumidor. */
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("font-semibold leading-none tracking-tight", className)}
			{...props}
		/>
	),
);
CardTitle.displayName = "CardTitle";

/** Texto de apoio sob o `CardTitle`. */
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
	),
);
CardDescription.displayName = "CardDescription";

/** Corpo do `Card`. */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
	),
);
CardContent.displayName = "CardContent";

/** Rodapé do `Card`, normalmente com as ações. */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
	),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
