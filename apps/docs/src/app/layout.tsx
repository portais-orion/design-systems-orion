import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BrandScript, defaultBrand } from "@/components/brand-provider";
import { Provider } from "@/components/provider";
import { appName } from "@/lib/shared";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Resolve as imagens de OG para URL absoluta; sem isto o Next cai em localhost:3000.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${appName} — Design System`,
    template: `%s — ${appName}`,
  },
  description:
    "Componentes e blocos multi-marca do ecossistema Orion: @design-systems-orion/ui e @design-systems-orion/blocks.",
};

export default function Layout({ children }: LayoutProps<"/">) {
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
