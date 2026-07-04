import type { AdvancedOption, AdvancedOptionGroup, AdvancedOptions } from "../_internal/options";

export type ComboboxOption = AdvancedOption;
export type ComboboxOptionGroup = AdvancedOptionGroup;
export type ComboboxOptions = AdvancedOptions;

export type ComboboxProps = {
	value?: string | null;
	onValueChange: (value: string | null) => void;
	options: ComboboxOptions;
	placeholder?: string;
	/** Mantido por compatibilidade de API: no padrão Base UI o próprio campo é a busca. */
	searchPlaceholder?: string;
	emptyMessage?: string;
	disabled?: boolean;
	clearable?: boolean;
	className?: string;
	contentClassName?: string;
	/** id repassado ao input (integração com Label). */
	id?: string;
	"aria-label"?: string;
};
