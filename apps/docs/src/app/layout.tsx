import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';
import { BrandScript, defaultBrand } from '@/components/brand-provider';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // Resolve as imagens de OG para URL absoluta; sem isto o Next cai em localhost:3000.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: `${appName} — Design System`,
    template: `%s — ${appName}`,
  },
  description:
    'Componentes e blocos multi-marca do ecossistema Orion: @portais-orion/ui e @portais-orion/blocks.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      data-brand={defaultBrand}
      className={inter.className}
      suppressHydrationWarning
    >
      <head>
        <BrandScript />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
