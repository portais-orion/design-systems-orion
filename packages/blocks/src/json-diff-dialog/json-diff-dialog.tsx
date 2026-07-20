import { Dialog, DialogContent, DialogHeader, DialogTitle, cn } from "@portais-orion/ui";

/*
 * Extraído de audit-log/audit-log-view: modal de diff antes/depois para
 * telas de auditoria, duas colunas com JSON formatado em <pre>.
 */
export type JsonDiffDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	beforeLabel?: string;
	afterLabel?: string;
	beforeValue?: unknown;
	afterValue?: unknown;
	emptyBeforeLabel?: string;
	emptyAfterLabel?: string;
	className?: string;
};

function formatValue(value: unknown, emptyLabel: string): string {
	if (value === undefined || value === null) return emptyLabel;
	return JSON.stringify(value, null, 2);
}

/**
 * Modal de diff antes/depois (auditoria): duas colunas com JSON formatado.
 * Não sabe de onde vêm os valores — só formata e exibe.
 */
export function JsonDiffDialog({
	open,
	onOpenChange,
	title = "Detalhes da alteração",
	beforeLabel = "Valor anterior",
	afterLabel = "Valor novo",
	beforeValue,
	afterValue,
	emptyBeforeLabel = "Nenhum valor anterior",
	emptyAfterLabel = "Nenhum valor novo",
	className,
}: JsonDiffDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn("max-w-3xl", className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-border bg-muted/30 p-4">
						<h3 className="mb-2 text-sm font-semibold text-foreground">{beforeLabel}</h3>
						<pre className="overflow-x-auto rounded bg-black/5 p-2 text-sm">
							{formatValue(beforeValue, emptyBeforeLabel)}
						</pre>
					</div>
					<div className="rounded-lg border border-border bg-muted/30 p-4">
						<h3 className="mb-2 text-sm font-semibold text-foreground">{afterLabel}</h3>
						<pre className="overflow-x-auto rounded bg-black/5 p-2 text-sm">
							{formatValue(afterValue, emptyAfterLabel)}
						</pre>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
