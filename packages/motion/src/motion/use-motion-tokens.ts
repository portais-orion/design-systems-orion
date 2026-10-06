"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { durationInSeconds, parseEasing } from "../token-values";

type Tokens = {
	fast: number;
	duration: number;
	panel: number;
	distance: number;
	ease: [number, number, number, number];
};
const emptyTokens: Tokens = { fast: 0, duration: 0, panel: 0, distance: 0, ease: [0, 0, 1, 1] };

/** CSS variables are the source of truth. Missing styles resolve to instant motion. */
export function useMotionTokens(ref: RefObject<HTMLElement | null>) {
	const [tokens, setTokens] = useState(emptyTokens);
	useEffect(() => {
		if (!ref.current) return;
		const style = getComputedStyle(ref.current);
		const value = (name: string) => style.getPropertyValue(`--motion-${name}`).trim();
		const distance = Number.parseFloat(value("distance-short")) * Number(value("intensity"));
		const next: Tokens = {
			fast: durationInSeconds(value("duration-fast")),
			duration: durationInSeconds(value("duration-default")),
			panel: durationInSeconds(value("duration-panel")),
			distance: Number.isFinite(distance) ? Math.max(0, distance) : 0,
			ease: parseEasing(value("ease-enter")),
		};
		setTokens((previous) => (JSON.stringify(previous) === JSON.stringify(next) ? previous : next));
	});
	return tokens;
}
