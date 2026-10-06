"use client";

import { LazyMotion, MotionConfig, domMin } from "motion/react";
import type { FeatureBundle } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useMotionPolicy } from "../react";

const ReadyContext = createContext(false);
const loadFeatures = () => import("./features").then((module) => module.default);

/** Loads animation features when activated, preserving the same React subtree. */
export function OrionMotionBoundary({ children }: { children: ReactNode }) {
	const { enabled, reduceMotion } = useMotionPolicy();
	const [features, setFeatures] = useState<FeatureBundle | null>(null);
	useEffect(() => {
		if (!enabled || features) return;
		let active = true;
		loadFeatures()
			.then((bundle) => {
				if (active) setFeatures(bundle);
			})
			.catch(() => {
				// The static rendered content remains usable if a chunk fails to load.
			});
		return () => {
			active = false;
		};
	}, [enabled, features]);
	return (
		<LazyMotion features={features ?? domMin} strict>
			<MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
				<ReadyContext.Provider value={enabled && features !== null}>
					{children}
				</ReadyContext.Provider>
			</MotionConfig>
		</LazyMotion>
	);
}

export function useOrionMotionReady() {
	return useContext(ReadyContext);
}
