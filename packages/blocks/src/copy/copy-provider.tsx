"use client";

import * as React from "react";

import { type BlocksCopy, type PartialBlocksCopy, defaultBlocksCopy, mergeCopy } from "./copy";

const BlocksCopyContext = React.createContext<BlocksCopy>(defaultBlocksCopy);

export type BlocksCopyProviderProps = {
	/** Só o que muda: o resto cai no default em pt-BR. */
	value?: PartialBlocksCopy;
	children: React.ReactNode;
};

/**
 * Injeta os textos usados pelos blocks (rótulos de a11y, estados vazios,
 * filtros). Sem provider, vale o dicionário pt-BR padrão. Uma instância por
 * app, próxima da raiz.
 */
export function BlocksCopyProvider({ value, children }: BlocksCopyProviderProps) {
	const copy = React.useMemo(() => mergeCopy(defaultBlocksCopy, value), [value]);
	return <BlocksCopyContext.Provider value={copy}>{children}</BlocksCopyContext.Provider>;
}

/** Textos dos blocks. Fora de um `BlocksCopyProvider`, devolve o default pt-BR. */
export function useBlocksCopy(): BlocksCopy {
	return React.useContext(BlocksCopyContext);
}
