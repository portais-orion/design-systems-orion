"use client";

import * as React from "react";

/*
 * Estado controlável (padrão value/defaultValue/onChange), compartilhado por
 * `Sidebar` e `AppShell`. NÃO exportar pelo barrel público.
 *
 * A regra que importa está em `resolveControllable`, fora do hook, para ser
 * testável sem React.
 */

/** O valor efetivo: o controlado quando existe, senão o interno. */
export function resolveControllable<T>(controlled: T | undefined, internal: T): T {
	return controlled === undefined ? internal : controlled;
}

/** Um gesto só mexe no estado interno quando ninguém está controlando de fora. */
export function shouldUpdateInternal<T>(controlled: T | undefined): boolean {
	return controlled === undefined;
}

export function useControllable<T>(
	controlled: T | undefined,
	defaultValue: T,
	onChange?: (next: T) => void,
) {
	const [internal, setInternal] = React.useState(defaultValue);
	const value = resolveControllable(controlled, internal);
	const set = React.useCallback(
		(next: T) => {
			if (shouldUpdateInternal(controlled)) setInternal(next);
			onChange?.(next);
		},
		[controlled, onChange],
	);
	return [value, set] as const;
}
