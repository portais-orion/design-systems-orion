"use client";

import type * as React from "react";

import { cn } from "@design-systems-orion/ui";

/*
 * Origem: portal-supertrans components/impersonation-banner.tsx — o original
 * falava direto com authClient (Better Auth) e navigation. Aqui a lógica de
 * sessão fica inteiramente no consumidor: o bloco só recebe `userLabel` e
 * `onStop`. Quem decide SE exibe (sessão simulada ou não) é o consumidor —
 * o bloco não renderiza `null` sozinho.
 */
export type ImpersonationBannerProps = {
	/** Nome ou e-mail de quem está sendo simulado. */
	userLabel: string;
	onStop: () => void;
	/** Mensagem customizada; default em pt-BR usa `userLabel`. */
	message?: (userLabel: string) => React.ReactNode;
	/** Rótulo do botão de encerrar. */
	stopLabel?: string;
	className?: string;
};

const defaultMessage = (userLabel: string) => (
	<>
		Você está simulando o acesso como <strong>{userLabel}</strong>.
	</>
);

/**
 * Faixa de aviso de sessão simulada (impersonation), de largura total e alto
 * contraste. Não decide sozinha quando aparecer — o consumidor só a monta
 * quando existir uma sessão simulada ativa.
 */
export function ImpersonationBanner({
	userLabel,
	onStop,
	message = defaultMessage,
	stopLabel = "Encerrar simulação",
	className,
}: ImpersonationBannerProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: role="status" é a live region correta; não existe elemento nativo equivalente
		<div
			role="status"
			className={cn(
				"relative z-[100] flex items-center justify-between gap-4 bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950 shadow-md",
				className,
			)}
		>
			<span>{message(userLabel)}</span>
			<button
				type="button"
				onClick={onStop}
				className="cursor-pointer rounded-md bg-amber-950 px-3 py-1.5 text-xs font-bold text-amber-500 transition-colors hover:bg-amber-900"
			>
				{stopLabel}
			</button>
		</div>
	);
}
