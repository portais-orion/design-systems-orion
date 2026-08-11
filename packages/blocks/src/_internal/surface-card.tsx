/*
 * Cartão de superfície de listagem — a moldura que envolve filtros, tabela e
 * rodapé. NÃO exportar pelo barrel público: `ListPageLayout.Card` e
 * `DataTable.Card` são as interfaces públicas, e antes cada uma desenhava o
 * próprio cartão (com raios diferentes para o mesmo papel visual).
 */
import type * as React from "react";

import { Card, cn } from "@design-systems-orion/ui";

export type SurfaceCardProps = {
	className?: string;
	children?: React.ReactNode;
};

export function SurfaceCard({ className, children }: SurfaceCardProps) {
	return <Card className={cn("overflow-hidden rounded-2xl", className)}>{children}</Card>;
}
