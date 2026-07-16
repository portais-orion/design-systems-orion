import Link from 'next/link';
import { Accessibility, Blocks, Palette } from 'lucide-react';

const highlights = [
  {
    icon: Blocks,
    title: 'Dois pacotes, um sistema',
    description:
      'Primitivas em @portais-orion/ui e composições prontas em @portais-orion/blocks, usadas por todos os portais do Grupo.',
  },
  {
    icon: Palette,
    title: 'Multi-marca por token',
    description:
      'Nenhum componente recebe prop de marca. O tema vem de data-brand no html e resolve por CSS variables.',
  },
  {
    icon: Accessibility,
    title: 'Acessível por padrão',
    description:
      'Construído sobre Base UI: navegação por teclado, foco visível e semântica de leitores de tela em todos os componentes.',
  },
];

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        {/* Grade sutil; a cor vem do token de borda para acompanhar tema e modo. */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-1 flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium backdrop-blur-md">
          <span className="mr-2 flex size-2 rounded-full bg-brand-accent" />
          Design System do Núcleo de Portais
        </div>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tighter md:text-7xl">
          Construa rápido.
          <br />
          <span className="bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            Escale com excelência.
          </span>
        </h1>

        <p className="mb-12 max-w-[700px] text-lg leading-relaxed text-muted-foreground md:text-xl">
          Componentes acessíveis e multi-marca para os portais do ecossistema Orion. Uma base de
          código, qualquer marca.
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:text-base"
          >
            Começar a desenvolver
          </Link>
          <Link
            href="/docs/blocks/data-table"
            className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 px-8 text-sm font-semibold shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:text-base"
          >
            Explorar blocos
          </Link>
        </div>

        <div className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-6 text-left md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-md transition-colors hover:border-primary/50"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
