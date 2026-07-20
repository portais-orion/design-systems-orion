"use client";

import * as React from "react";

/*
 * Origem: portal-supertrans components/guards/permission-gate.tsx. O original
 * importava `usePermissions` direto de um hook do produto — aqui o resolvedor
 * de permissão entra via `PermissionProvider` (context), então o bloco nunca
 * conhece a fonte real das permissões (API, cache, RBAC local, o que for).
 * Semântica preservada: enquanto carrega, renderiza `null`; `requires` tem
 * precedência sobre `requiresAny`, que tem precedência sobre `requiresAll`;
 * sem nenhum dos três, libera.
 */
export type PermissionContextValue = {
	hasPermission: (key: string) => boolean;
	hasAny: (keys: string[]) => boolean;
	hasAll: (keys: string[]) => boolean;
	isLoading?: boolean;
};

const PermissionContext = React.createContext<PermissionContextValue | null>(null);

export type PermissionProviderProps = {
	value: PermissionContextValue;
	children: React.ReactNode;
};

/**
 * Injeta o resolvedor de permissões (`hasPermission`/`hasAny`/`hasAll`) usado
 * por `PermissionGate` em toda a árvore abaixo. Uma única instância por app,
 * próxima da raiz — o consumidor decide de onde vêm as permissões reais.
 */
export function PermissionProvider({ value, children }: PermissionProviderProps) {
	return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

function usePermissionContext(): PermissionContextValue {
	const ctx = React.useContext(PermissionContext);
	if (!ctx) {
		throw new Error("PermissionGate precisa estar dentro de um <PermissionProvider>.");
	}
	return ctx;
}

export type PermissionGateProps = {
	requires?: string;
	requiresAny?: string[];
	requiresAll?: string[];
	fallback?: React.ReactNode;
	children: React.ReactNode;
};

/**
 * Renderiza `children` só se a permissão exigida for concedida; caso
 * contrário renderiza `fallback` (default `null`). Enquanto o resolvedor
 * ainda está carregando, não renderiza nada. Precisa de um `PermissionProvider`
 * como ancestral.
 */
export function PermissionGate({
	requires,
	requiresAny,
	requiresAll,
	fallback = null,
	children,
}: PermissionGateProps) {
	const { hasPermission, hasAny, hasAll, isLoading } = usePermissionContext();

	if (isLoading) return null;

	let allowed = true;
	if (requires) {
		allowed = hasPermission(requires);
	} else if (requiresAny) {
		allowed = hasAny(requiresAny);
	} else if (requiresAll) {
		allowed = hasAll(requiresAll);
	}

	return <>{allowed ? children : fallback}</>;
}
