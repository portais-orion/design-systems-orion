import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/cn";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline: "text-foreground",
				tinted: "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10",
				success:
					"border-transparent bg-success-subtle text-success-subtle-foreground hover:opacity-90",
				warning:
					"border-transparent bg-warning-subtle text-warning-subtle-foreground hover:opacity-90",
				info: "border-transparent bg-info-subtle text-info-subtle-foreground hover:opacity-90",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

/**
 * Etiqueta compacta para status, categoria ou contagem. É um elemento estático:
 * para algo clicável use `Button`.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant, ...props }, ref) => {
		return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
	},
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
