'use client';

import { useState } from 'react';
import { Check, Copy, Monitor, Smartphone, Tablet } from 'lucide-react';
import type { StoryObj } from '@storybook/react';
import { registry } from './registry.generated';

function StoryRender({
  story,
  Component,
}: {
  story: StoryObj;
  Component?: React.ComponentType<Record<string, unknown>>;
}) {
  const entry = story as {
    render?: (args: Record<string, unknown>) => React.ReactNode;
    args?: Record<string, unknown>;
  };
  const args = entry.args ?? {};

  if (typeof entry.render === 'function') {
    return <>{entry.render(args)}</>;
  }

  if (!Component) return null;
  return <Component {...args} />;
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
}

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' },
] as const;

type ViewportId = (typeof VIEWPORTS)[number]['id'];

/**
 * Preview de um bloco/página inteira: ocupa a largura total do artigo (sem
 * o `max-w-3xl` centralizado do preview de componente isolado) e tem um
 * seletor de viewport (desktop/tablet/mobile) para simular breakpoints.
 * Usado em `page-examples.mdx` — para o preview compacto de um componente
 * único, use `ComponentPreview` sem `block`.
 */
function BlockPreview({
  storyObj,
  Component,
  code,
}: {
  storyObj: StoryObj;
  Component?: React.ComponentType<Record<string, unknown>>;
  code?: string;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<ViewportId>('desktop');

  return (
    <div className="my-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-fd-border pb-2">
        <div className="flex gap-1">
          {(['preview', 'code'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              data-active={tab === value}
              className="-mb-px border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:border-fd-primary data-[active=true]:text-fd-foreground"
            >
              {value === 'preview' ? 'Preview' : 'Código'}
            </button>
          ))}
        </div>

        {tab === 'preview' ? (
          <div className="flex items-center gap-1 rounded-md border border-fd-border p-0.5">
            {VIEWPORTS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                title={label}
                aria-label={label}
                onClick={() => setViewport(id)}
                data-active={viewport === id}
                className="rounded p-1.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:bg-fd-muted data-[active=true]:text-fd-foreground"
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        ) : code ? (
          <CopyCodeButton code={code} />
        ) : null}
      </div>

      {tab === 'preview' ? (
        <div className="w-full overflow-x-auto rounded-xl border border-fd-border bg-fd-muted/30 p-4">
          <div
            className="mx-auto overflow-hidden rounded-lg border border-fd-border bg-fd-background shadow-sm transition-[width] duration-200"
            style={{ width: VIEWPORTS.find((v) => v.id === viewport)?.width }}
          >
            <StoryRender story={storyObj} Component={Component} />
          </div>
        </div>
      ) : (
        <pre className="max-h-[520px] overflow-auto rounded-xl border border-fd-border bg-fd-muted p-4 text-sm">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export function ComponentPreview({
  name,
  story,
  block = false,
}: {
  name: string;
  story: string;
  /** Preview de página/bloco inteiro: largura total + seletor de viewport, em vez do card compacto centralizado. */
  block?: boolean;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const entry = registry[name];
  const storyObj = entry?.stories[story];
  const code = entry?.code[story];

  if (!entry || !storyObj) {
    return (
      <div className="my-4 rounded-lg border border-fd-border bg-fd-muted p-4 text-sm text-fd-muted-foreground">
        Story <code>{story}</code> não encontrada no registry para <code>{name}</code>. Rode{' '}
        <code>node scripts/generate-docs.mjs</code>.
      </div>
    );
  }

  if (block) {
    return <BlockPreview storyObj={storyObj} Component={entry.meta?.component} code={code} />;
  }

  return (
    <div className="my-4">
      <div className="mb-2 flex gap-1 border-b border-fd-border">
        {(['preview', 'code'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            data-active={tab === value}
            className="-mb-px border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground data-[active=true]:border-fd-primary data-[active=true]:text-fd-foreground"
          >
            {value === 'preview' ? 'Preview' : 'Código'}
          </button>
        ))}
      </div>

      {tab === 'preview' ? (
        <div className="flex min-h-[180px] w-full items-center justify-center overflow-x-auto rounded-xl border border-fd-border bg-fd-background p-6">
          <div className="flex w-full max-w-3xl justify-center">
            <StoryRender story={storyObj} Component={entry.meta?.component} />
          </div>
        </div>
      ) : (
        <pre className="max-h-[400px] overflow-auto rounded-xl border border-fd-border bg-fd-muted p-4 text-sm">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
