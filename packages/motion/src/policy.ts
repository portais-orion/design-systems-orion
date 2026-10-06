export type ReducedMotion = "user" | "always";

export type MotionPolicy = { enabled: boolean; reduceMotion: boolean };

export function resolveMotionPolicy({
	enabled,
	reducedMotion,
	userPrefersReducedMotion,
}: {
	enabled: boolean;
	reducedMotion: ReducedMotion;
	userPrefersReducedMotion: boolean | null;
}): MotionPolicy {
	return {
		enabled,
		reduceMotion: !enabled || reducedMotion === "always" || userPrefersReducedMotion !== false,
	};
}
