import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Marcador pulsante que ocupa o espaço do conteúdo enquanto ele carrega. Não
 * tem tamanho próprio: defina altura e largura via `className` para espelhar o
 * conteúdo real e evitar deslocamento de layout na troca.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("animate-pulse rounded-md bg-muted/50", className)} {...props} />;
}

export { Skeleton };
