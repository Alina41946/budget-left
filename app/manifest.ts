import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '可用預算',
    short_name: '可用預算',
    description: '簡單查看當月還有多少預算可以使用。',
    start_url: '/budget-left/',
    display: 'standalone',
    background_color: '#f6f3ee',
    theme_color: '#f6f3ee',
    lang: 'zh-Hant-TW',
    icons: [
      {
        src: '/budget-left/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
