'use client';

import { useState } from 'react';
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

export function ComponentPreview({ name, story }: { name: string; story: string }) {
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
        <div className="flex min-h-[350px] w-full items-center justify-center rounded-xl border border-fd-border bg-fd-background p-10">
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
