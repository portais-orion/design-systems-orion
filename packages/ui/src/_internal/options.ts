/*
 * Helpers internos de Combobox/MultiSelect. N�O exportar pelo barrel p�blico.
 * O shape { value, label } � reconhecido nativamente pelo Base UI (LabeledItem);
 * grupos usam o shape Group do Base UI: { items: [...], ...meta }.
 */

export type AdvancedOption = {
	label: string;
	value: string;
	disabled?: boolean;
	description?: string;
};

export type AdvancedOptionGroup = {
	label: string;
	options: AdvancedOption[];
};

export type AdvancedOptions = Array<AdvancedOption | AdvancedOptionGroup>;

/** Shape de grupo aceito pelo `items` do Base UI Combobox. */
export type BaseUiGroup = { label: string; items: AdvancedOption[] };

export function isOptionGroup(o: AdvancedOption | AdvancedOptionGroup): o is AdvancedOptionGroup {
	return "options" in o;
}

export function hasGroups(options: AdvancedOptions): boolean {
	return options.some(isOptionGroup);
}

export function flattenOptions(options: AdvancedOptions): AdvancedOption[] {
	return options.flatMap((o) => (isOptionGroup(o) ? o.options : [o]));
}

/** Converte para o formato `items` do Base UI (plano ou agrupado). */
export function toBaseUiItems(options: AdvancedOptions): AdvancedOption[] | BaseUiGroup[] {
	if (!hasGroups(options)) return options as AdvancedOption[];
	return options.map((o) =>
		isOptionGroup(o) ? { label: o.label, items: o.options } : { label: "", items: [o] },
	);
}

export function findOptionByValue(
	options: AdvancedOptions,
	value: string | null | undefined,
): AdvancedOption | null {
	if (value == null) return null;
	return flattenOptions(options).find((o) => o.value === value) ?? null;
}

export function findOptionsByValues(options: AdvancedOptions, values: string[]): AdvancedOption[] {
	const flat = flattenOptions(options);
	return values
		.map((v) => flat.find((o) => o.value === v))
		.filter((o): o is AdvancedOption => o != null);
}

export const sameOption = (a: AdvancedOption | null, b: AdvancedOption | null) =>
	a?.value === b?.value;
