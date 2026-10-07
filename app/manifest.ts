import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '還可以花多少', short_name: '預算', description: '簡單查看這個月還可以花多少錢。', start_url: '/', display: 'standalone', background_color: '#f6f3ee', theme_color: '#f6f3ee', lang: 'zh-Hant', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }]
  };
}
