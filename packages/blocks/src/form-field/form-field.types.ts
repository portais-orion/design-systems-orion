import type * as React from "react";

export type FormFieldProps = {
	label?: React.ReactNode;
	htmlFor?: string;
	description?: React.ReactNode;
	error?: React.ReactNode;
	required?: boolean;
	children: React.ReactNode;
	className?: string;
};
