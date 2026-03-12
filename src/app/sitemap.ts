import { MetadataRoute } from 'next';

import { siteUrl } from '@/utils/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteUrl,
            lastModified: new Date().toISOString(),
        },
    ];
}
