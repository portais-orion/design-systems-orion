"use client";

import { Minimize2, Tv2 } from "lucide-react";
import * as React from "react";

import { Button, cn } from "@design-systems-orion/ui";

/*
 * Extraído de components/cronograma/cronograma-page.tsx (isTvMode,
 * toggleTvMode, currentTime): botão que ativa a Fullscreen API e mostra um
 * relógio ao vivo (atualizado a cada minuto, como no original), para
 * dashboards operacionais exibidos em painel/TV. Autocontido: gerencia seu
 * próprio estado de fullscreen via document.fullscreenElement — não precisa
 * de estado externo.
 */
export type KioskModeToggleProps = {
	/** Elemento que entra em fullscreen. Padrão: `document.documentElement`. */
	targetRef?: React.RefObject<HTMLElement>;
	clockFormat?: Intl.DateTimeFormatOptions;
	enterLabel?: string;
	exitLabel?: string;
	className?: string;
};

const DEFAULT_CLOCK_FORMAT: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };

/**
 * Botão de modo apresentação/kiosk: ativa fullscreen no elemento alvo (ou na
 * página inteira) e exibe um relógio ao vivo enquanto ativo. Sai do modo
 * automaticamente se o usuário sair do fullscreen por fora (ESC, etc.).
 */
export function KioskModeToggle({
	targetRef,
	clockFormat = DEFAULT_CLOCK_FORMAT,
	enterLabel = "Modo TV",
	exitLabel = "Sair do modo TV",
	className,
}: KioskModeToggleProps) {
	const [isActive, setIsActive] = React.useState(false);
	const [now, setNow] = React.useState(() => new Date());

	React.useEffect(() => {
		const handleChange = () => setIsActive(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", handleChange);
		return () => document.removeEventListener("fullscreenchange", handleChange);
	}, []);

	React.useEffect(() => {
		if (!isActive) return;
		const id = setInterval(() => setNow(new Date()), 60_000);
		return () => clearInterval(id);
	}, [isActive]);

	async function toggle() {
		const target = targetRef?.current ?? document.documentElement;
		if (document.fullscreenElement) {
			await document.exitFullscreen();
		} else {
			await target.requestFullscreen();
			setNow(new Date());
		}
	}

	return (
		<div className={cn("flex items-center gap-3", className)}>
			{isActive && (
				<span className="font-mono text-sm text-muted-foreground tabular-nums">
					{now.toLocaleTimeString("pt-BR", clockFormat)}
				</span>
			)}
			<Button type="button" variant="outline" size="sm" onClick={toggle}>
				{isActive ? <Minimize2 /> : <Tv2 />}
				{isActive ? exitLabel : enterLabel}
			</Button>
		</div>
	);
}
