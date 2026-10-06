"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { resolveMotionPolicy } from "../policy";
import type { MotionPolicy, ReducedMotion } from "../policy";

const preferenceQuery = "(prefers-reduced-motion: reduce)";
const MotionContext = createContext<MotionPolicy | null>(null);
const defaultPolicy: MotionPolicy = { enabled: false, reduceMotion: true };

function subscribe(onChange: () => void) {
	const query = window.matchMedia(preferenceQuery);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
	return window.matchMedia(preferenceQuery).matches;
}

const getServerSnapshot = () => null;

export type MotionProviderProps = {
	children: ReactNode;
	enabled?: boolean;
	reducedMotion?: ReducedMotion;
};

/** Enables Orion motion without adding DOM wrappers. System preference takes precedence. */
export function MotionProvider({
	children,
	enabled = false,
	reducedMotion = "user",
}: MotionProviderProps) {
	const userPrefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const policy = resolveMotionPolicy({ enabled, reducedMotion, userPrefersReducedMotion });
	return <MotionContext.Provider value={policy}>{children}</MotionContext.Provider>;
}

export function useMotionPolicy(): MotionPolicy {
	return useContext(MotionContext) ?? defaultPolicy;
}

/** Distinguishes legacy styling without a provider from an explicitly disabled provider. */
export function useMotionMode(): "legacy" | "off" | "reduced" | "full" {
	const policy = useContext(MotionContext);
	if (!policy) return "legacy";
	return !policy.enabled ? "off" : policy.reduceMotion ? "reduced" : "full";
}
