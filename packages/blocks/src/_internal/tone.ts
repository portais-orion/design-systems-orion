/*
 * Tons semânticos de estado — tradução única de (tom, ênfase) para classes.
 *
 * NÃO exportar pelo barrel público: a interface dos blocks continua sendo a
 * prop `tone`; este módulo é a implementação por trás dela. Antes disso, treze
 * blocos carregavam o próprio mapa tom→cor com literais crus da paleta, e eles
 * divergiam (nove grafias de "success"). Aqui a decisão mora uma vez, sobre os
 * tokens de `@design-systems-orion/tokens`, então marca e modo escuro valem de
 * graça.
 */

export const TONES = ["neutral", "brand", "info", "success", "warning", "danger"] as const;

export type Tone = (typeof TONES)[number];

/**
 * - `solid`: preenchimento cheio (barra, dot, badge de destaque).
 * - `subtle`: superfície clara + texto legível sobre ela.
 * - `surface`: `subtle` com borda — cartões e faixas.
 * - `text`: só a cor do texto/ícone.
 * - `border`: só a borda.
 * - `edge`: só a borda esquerda — a faixa de cor de cards e itens de lista.
 * - `dot`: preenchimento sem texto (indicadores redondos, trilhas de gráfico).
 */
export type ToneEmphasis = "solid" | "subtle" | "surface" | "text" | "border" | "edge" | "dot";

const TONE_CLASSES: Record<Tone, Record<ToneEmphasis, string>> = {
	neutral: {
		solid: "bg-muted-foreground text-background",
		subtle: "bg-muted text-muted-foreground",
		surface: "border border-border bg-muted text-muted-foreground",
		text: "text-muted-foreground",
		border: "border-border",
		edge: "border-l-muted-foreground/40",
		dot: "bg-muted-foreground",
	},
	brand: {
		solid: "bg-primary text-primary-foreground",
		subtle: "bg-primary/10 text-primary",
		surface: "border border-primary/20 bg-primary/10 text-primary",
		text: "text-primary",
		border: "border-primary",
		edge: "border-l-primary",
		dot: "bg-primary",
	},
	info: {
		solid: "bg-info text-info-foreground",
		subtle: "bg-info-subtle text-info-subtle-foreground",
		surface: "border border-info-subtle bg-info-subtle text-info-subtle-foreground",
		text: "text-info",
		border: "border-info",
		edge: "border-l-info",
		dot: "bg-info",
	},
	success: {
		solid: "bg-success text-success-foreground",
		subtle: "bg-success-subtle text-success-subtle-foreground",
		surface: "border border-success-subtle bg-success-subtle text-success-subtle-foreground",
		text: "text-success",
		border: "border-success",
		edge: "border-l-success",
		dot: "bg-success",
	},
	warning: {
		solid: "bg-warning text-warning-foreground",
		subtle: "bg-warning-subtle text-warning-subtle-foreground",
		surface: "border border-warning-subtle bg-warning-subtle text-warning-subtle-foreground",
		text: "text-warning",
		border: "border-warning",
		edge: "border-l-warning",
		dot: "bg-warning",
	},
	danger: {
		solid: "bg-destructive text-destructive-foreground",
		subtle: "bg-destructive-subtle text-destructive-subtle-foreground",
		surface:
			"border border-destructive-subtle bg-destructive-subtle text-destructive-subtle-foreground",
		text: "text-destructive",
		border: "border-destructive",
		edge: "border-l-destructive",
		dot: "bg-destructive",
	},
};

/** Sinônimos aceitos nas props públicas dos blocos, que nasceram com nomes diferentes. */
const TONE_ALIASES: Record<string, Tone> = {
	default: "neutral",
	muted: "neutral",
	secondary: "neutral",
	primary: "info",
	blue: "info",
	green: "success",
	positive: "success",
	done: "success",
	amber: "warning",
	pending: "warning",
	attention: "warning",
	error: "danger",
	destructive: "danger",
	red: "danger",
	negative: "danger",
};

/** Normaliza um tom vindo de prop pública; desconhecido cai em `neutral`. */
export function resolveTone(tone: string | undefined | null): Tone {
	if (!tone) return "neutral";
	if ((TONES as readonly string[]).includes(tone)) return tone as Tone;
	return TONE_ALIASES[tone] ?? "neutral";
}

/** Classes do tom na ênfase pedida. Aceita os sinônimos de `resolveTone`. */
export function toneClass(tone: string | undefined | null, emphasis: ToneEmphasis = "subtle") {
	return TONE_CLASSES[resolveTone(tone)][emphasis];
}
