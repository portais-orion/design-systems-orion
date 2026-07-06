import type * as React from "react";

import { Label, cn } from "@portais-orion/ui";

import { FormMessage } from "../form-message";
import type { FormFieldProps } from "./form-field.types";

/*
 * Padroniza o trio label + controle + mensagem repetido à mão em todos os
 * forms do Supertrans (space-y-1.5 / text-xs text-destructive). Agnóstico de
 * form library: `error` chega por prop (RHF: errors.campo?.message).
 *
 * a11y: quando `htmlFor` é informado, description/error recebem ids
 * `<htmlFor>-description` / `<htmlFor>-error`. Conecte no controle:
 *   <Input id="nome" aria-describedby="nome-description nome-error" />
 * (a conexão é responsabilidade do consumidor � o FormField não clona filhos).
 */
export function FormField({
	label,
	htmlFor,
	description,
	error,
	required,
	children,
	className,
}: FormFieldProps) {
	const descriptionId = htmlFor ? `${htmlFor}-description` : undefined;
	const errorId = htmlFor ? `${htmlFor}-error` : undefined;

	return (
		<div className={cn("grid gap-1.5", className)}>
			{label && (
				<Label htmlFor={htmlFor}>
					{label}
					{required && (
						<span aria-hidden="true" className="ml-0.5 text-destructive">
							*
						</span>
					)}
				</Label>
			)}
			{children}
			{description && !error && (
				<FormMessage id={descriptionId} tone="default">
					{description}
				</FormMessage>
			)}
			{error && (
				<FormMessage id={errorId} tone="error">
					{error}
				</FormMessage>
			)}
		</div>
	);
}
