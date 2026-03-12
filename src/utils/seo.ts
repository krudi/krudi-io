import type { Metadata } from 'next';

import { siteUrl } from '@/utils/site-url';

export const siteMetadata = {
    siteUrl,
    name: 'Patryk Kudlik',
    title: 'Patryk Kudlik | krudi-io',
    description:
        'Personal portfolio of Patryk Kudlik, software engineer building accessible, thoughtful interfaces and resilient architecture with React, TypeScript, Vue, TYPO3.',
    keywords: [
        'Patryk Kudlik',
        'krudi',
        'react',
        'nextjs',
        'typescript',
        'javascript',
        'frontend',
        'full-stack',
        'portfolio',
        'web-developer',
        'software-engineer',
        'design-systems',
        'cms',
        'accessibility',
        'performance',
        'ui',
        'ux',
    ] as string[],
    locale: 'en_US',
    twitterHandle: '@patrykkudlik',
    ogImage: {
        url: new URL('/meta-tags/page-view.png', siteUrl).toString(),
        alt: 'Portfolio preview for Patryk Kudlik',
        width: 1800,
        height: 1600,
    },
    authors: [
        {
            name: 'Patryk Kudlik',
            url: siteUrl,
        },
    ] satisfies NonNullable<Metadata['authors']>,
    verification: {
        google: 'OnPG5VlpLp5UmeyYBqwJdFGNYY_LrqEkHifYjK1qlO4',
    } satisfies NonNullable<Metadata['verification']>,
} as const;

type CreatePageMetadataOptions = {
    path?: string;
    title?: string;
    description?: string;
    keywords?: string[];
};

export function createPageMetadata({
    path = '/',
    title = siteMetadata.title,
    description = siteMetadata.description,
    keywords = siteMetadata.keywords,
}: CreatePageMetadataOptions): Metadata {
    const canonicalUrl = new URL(path, siteMetadata.siteUrl).toString();

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: siteMetadata.name,
            locale: siteMetadata.locale,
            type: 'website',
            images: [
                {
                    url: siteMetadata.ogImage.url,
                    width: siteMetadata.ogImage.width,
                    height: siteMetadata.ogImage.height,
                    alt: siteMetadata.ogImage.alt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: siteMetadata.twitterHandle,
            images: [siteMetadata.ogImage.url],
        },
    };
}
