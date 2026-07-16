import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Decorative Background & Gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[#0a0a0a]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center text-center flex-1 px-4 pt-32 pb-20">
        
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium mb-8 backdrop-blur-md transition-colors hover:bg-muted/80 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          Supertrans & Aurora Design System v1.0
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6">
          Construa rápido.<br/>
          <span className="bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            Escale com excelência.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground max-w-[700px] mb-12 font-medium leading-relaxed">
          O <strong>Núcleo de Portais</strong> oferece componentes incrivelmente bonitos, acessíveis e customizáveis. Criados para o ecossistema Orion.
        </p>
        
        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/docs/ui/button" 
            className="group relative inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-primary px-8 text-sm md:text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Começar a Desenvolver
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <Link 
            href="/docs/blocks/app-shell" 
            className="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-sm md:text-base font-semibold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explorar Blocos
          </Link>
        </div>

        {/* Floating Features / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full max-w-5xl">
          <div className="flex flex-col p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Performance Extrema</h3>
            <p className="text-muted-foreground">Otimizado para Server Components e renderização ultra-rápida no Next.js.</p>
          </div>
          <div className="flex flex-col p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-marcas</h3>
            <p className="text-muted-foreground">Tokens dinâmicos que se adaptam instantaneamente aos temas da Supertrans e Aurora.</p>
          </div>
          <div className="flex flex-col p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Acessível por Padrão</h3>
            <p className="text-muted-foreground">Suporte total a navegação por teclado e leitores de tela em todos os componentes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
