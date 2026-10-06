type MotionMode = "legacy" | "off" | "reduced" | "full";

/** Token-based Base UI transitions; no animation engine in primitives. */
export function surfaceMotionClasses(mode: MotionMode, legacy: string, full: string) {
	if (mode === "legacy")
		return `${legacy} motion-reduce:animate-none motion-reduce:transition-none`;
	if (mode === "off") return "animate-none transition-none duration-0";
	if (mode === "reduced")
		return "animate-none transition-opacity duration-(--motion-duration-fast) ease-motion-enter data-[starting-style]:opacity-0 data-[ending-style]:opacity-0";
	return `animate-none duration-(--motion-duration-default) ease-motion-enter data-[ending-style]:ease-motion-exit ${full}`;
}
