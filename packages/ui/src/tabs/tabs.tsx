"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../utils/cn";

/*
 * Recriado em Base UI. Referência de API: Portal-Aurora ui/tabs.tsx (Radix).
 * Nome público mantém o padrão shadcn (TabsTrigger/TabsContent) para baratear
 * a migração — no Base UI os primitivos são Tab e Panel.
 */
const TabsContext = React.createContext<{ variant?: "default" | "line" }>({
	variant: "default",
});

/**
 * Alterna entre painéis de conteúdo no mesmo contexto, sem navegar. Componha
 * com `TabsList`, `TabsTrigger` e `TabsContent`; a variante escolhida em
 * `TabsList` é herdada pelos gatilhos.
 */
const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
	"inline-flex items-center justify-center text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start",
	{
		variants: {
			variant: {
				default: "rounded-lg bg-muted p-1 data-[orientation=vertical]:h-auto",
				line: "justify-start bg-transparent p-0 data-[orientation=horizontal]:border-b data-[orientation=horizontal]:border-border data-[orientation=horizontal]:w-full data-[orientation=vertical]:border-l data-[orientation=vertical]:border-border data-[orientation=vertical]:h-full",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/** Barra que agrupa os `TabsTrigger`. Define a variante visual do conjunto. */
const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant = "default", ...props }, ref) => (
	<TabsContext.Provider value={{ variant: variant || "default" }}>
		<TabsPrimitive.List
			ref={ref}
			className={cn(tabsListVariants({ variant, className }))}
			{...props}
		/>
	</TabsContext.Provider>
));
TabsList.displayName = "TabsList";

const tabsTriggerVariants = cva(
	"inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"rounded-md px-3 py-1 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
				line: "px-4 py-2 ring-offset-background data-[selected]:text-primary data-[orientation=horizontal]:data-[selected]:border-b-2 data-[orientation=horizontal]:data-[selected]:border-primary data-[orientation=horizontal]:-mb-px data-[orientation=vertical]:data-[selected]:border-l-2 data-[orientation=vertical]:data-[selected]:border-primary data-[orientation=vertical]:-ml-px data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start border-transparent data-[orientation=horizontal]:border-b-2 data-[orientation=vertical]:border-l-2",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/** Aba clicável. Seu `value` casa com o do `TabsContent` correspondente. */
const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Tab>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Tab> &
		VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => {
	const context = React.useContext(TabsContext);
	const resolvedVariant = variant || context.variant;

	return (
		<TabsPrimitive.Tab
			ref={ref}
			className={cn(tabsTriggerVariants({ variant: resolvedVariant, className }))}
			{...props}
		/>
	);
});
TabsTrigger.displayName = "TabsTrigger";

/** Painel exibido quando a aba de mesmo `value` está ativa. */
const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Panel>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Panel>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Panel
		ref={ref}
		className={cn(
			"mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
