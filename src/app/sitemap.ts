import { siteUrl } from '@utils/site/site-url';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteUrl,
            lastModified: new Date().toISOString(),
        },
    ];
}
