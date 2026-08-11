/*
 * Dicionário de textos dos blocks.
 *
 * Os blocos nasceram com a copy em pt-BR embutida, e parte dela não era
 * sobrescrevível por prop — o rótulo da coluna de ações da tabela, o
 * `aria-label` do botão de menu do shell, o nome da navegação principal. Aqui
 * eles viram dados com default em pt-BR: quem quiser outro idioma (ou outro
 * vocabulário) injeta um `BlocksCopyProvider` na raiz, e as props de texto
 * continuam valendo por cima, caso a caso.
 *
 * A parte pura (o merge) fica separada do provider para rodar no runner de node.
 */

export type BlocksCopy = {
	dataTable: {
		/** Cabeçalho (só para leitor de tela) da coluna final de ações. */
		actionsColumn: string;
		empty: string;
	};
	appShell: {
		openNavigation: string;
		navigationMenu: string;
	};
	sidebar: {
		switchModule: string;
		expandNavigation: string;
		collapseNavigation: string;
		mainNavigation: string;
	};
	filters: {
		title: string;
		clear: string;
		show: string;
		hide: string;
	};
	states: {
		errorTitle: string;
		errorDescription: string;
		missingPrerequisitesTitle: string;
		missingPrerequisitesDescription: string;
		back: string;
	};
};

export type PartialBlocksCopy = {
	[Section in keyof BlocksCopy]?: Partial<BlocksCopy[Section]>;
};

export const defaultBlocksCopy: BlocksCopy = {
	dataTable: {
		actionsColumn: "Ações",
		empty: "Nenhum registro encontrado",
	},
	appShell: {
		openNavigation: "Abrir menu de navegação",
		navigationMenu: "Menu de navegação",
	},
	sidebar: {
		switchModule: "Trocar módulo",
		expandNavigation: "Expandir navegação",
		collapseNavigation: "Recolher navegação",
		mainNavigation: "Navegação principal",
	},
	filters: {
		title: "Filtros",
		clear: "Limpar filtros",
		show: "Mostrar",
		hide: "Ocultar",
	},
	states: {
		errorTitle: "Não foi possível carregar os dados",
		errorDescription: "Ocorreu um erro de comunicação. Tente novamente em alguns instantes.",
		missingPrerequisitesTitle: "Cadastros incompletos",
		missingPrerequisitesDescription:
			"Para continuar, é necessário que os seguintes cadastros possuam pelo menos um registro no sistema:",
		back: "Voltar",
	},
};

/**
 * Sobrepõe uma copy parcial ao default, seção por seção: quem traduz só a
 * tabela não precisa redigitar o resto do dicionário.
 */
export function mergeCopy(base: BlocksCopy, override?: PartialBlocksCopy): BlocksCopy {
	if (!override) return base;

	return {
		dataTable: { ...base.dataTable, ...override.dataTable },
		appShell: { ...base.appShell, ...override.appShell },
		sidebar: { ...base.sidebar, ...override.sidebar },
		filters: { ...base.filters, ...override.filters },
		states: { ...base.states, ...override.states },
	};
}
