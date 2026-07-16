import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BrandSwitcher } from '@/components/brand-switcher';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        type: 'custom',
        secondary: true,
        children: <BrandSwitcher />,
      },
    ],
  };
}
