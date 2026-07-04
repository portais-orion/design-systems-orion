import type { AdvancedOption, AdvancedOptionGroup, AdvancedOptions } from "../_internal/options";

export type MultiSelectOption = AdvancedOption;
export type MultiSelectOptionGroup = AdvancedOptionGroup;
export type MultiSelectOptions = AdvancedOptions;

export type MultiSelectProps = {
	value: string[];
	onValueChange: (value: string[]) => void;
	options: MultiSelectOptions;
	placeholder?: string;
	/** Mantido por compatibilidade de API: no padrão Base UI o próprio campo é a busca. */
	searchPlaceholder?: string;
	emptyMessage?: string;
	disabled?: boolean;
	clearable?: boolean;
	/** Chips visíveis antes do indicador +N. */
	maxDisplay?: number;
	className?: string;
	contentClassName?: string;
	id?: string;
	"aria-label"?: string;
};
