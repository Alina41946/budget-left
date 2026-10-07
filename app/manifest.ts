import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '還可以花多少',
    short_name: '還可以花多少',
    description: '簡單查看當月還有多少預算可以使用。',

    start_url: '/budget-left/',
    scope: '/budget-left/',

    display: 'standalone',

    background_color: '#f6f3ee',
    theme_color: '#f6f3ee',

    lang: 'zh-Hant-TW',

    icons: [
      {
        src: '/budget-left/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/budget-left/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

    screenshots: [
      {
        src: '/budget-left/screenshot-desktop.png',
        sizes: '1440x900',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: '/budget-left/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
      },
    ],
  };
}
