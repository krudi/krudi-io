import '@styles/styles.css';

import ApolloClientProvider from '@components/providers/apollo-provider';
import type { Metadata, Viewport } from 'next';
import { Lora } from 'next/font/google';
import { type ReactNode, Suspense } from 'react';

import { MatomoAnalytics } from '@/components/utils/matomo';

export const metadata: Metadata = {
    title: 'Patryk Kudlik | krudi-io',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    applicationName: 'krudi-io',
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
    ],
    authors: [
        {
            name: 'Patryk Kudlik',
            url: process.env.NEXT_PUBLIC_SITE_URL,
        },
    ],
    creator: 'Patryk Kudlik',
    publisher: 'Patryk Kudlik',
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL,
    },
    referrer: 'origin-when-cross-origin',
    openGraph: {
        title: 'Patryk Kudlik | krudi-io',
        description:
            'Personal portfolio of Patryk Kudlik, software engineer building accessible, thoughtful interfaces and resilient architecture with React, TypeScript, Vue, TYPO3.',
        url: process.env.NEXT_PUBLIC_SITE_URL!,
        siteName: 'Patryk Kudlik – krudi-io',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL!}/meta-tags/page-view.png`,
                width: 1800,
                height: 1600,
                alt: 'Portfolio preview for Patryk Kudlik',
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
    twitter: {
        title: 'Patryk Kudlik | krudi-io',
        description:
            'Personal portfolio of Patryk Kudlik, software engineer building accessible, thoughtful interfaces and resilient architecture with React, TypeScript, Vue, TYPO3.',
        card: 'summary_large_image',
        creator: '@patrykkudlik',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL!}/meta-tags/page-view.png`,
                alt: 'Portfolio preview for Patryk Kudlik',
            },
        ],
    },
    verification: {
        google: 'OnPG5VlpLp5UmeyYBqwJdFGNYY_LrqEkHifYjK1qlO4',
    },
    icons: {
        icon: [
            {
                url: '/favicons/favicon-16x16.png',
                type: 'image/png',
                sizes: '16x16',
            },
            {
                url: '/favicons/favicon-32x32.png',
                type: 'image/png',
                sizes: '32x32',
            },
            {
                url: '/favicons/favicon-36x36.png',
                type: 'image/png',
                sizes: '36x36',
            },
            {
                url: '/favicons/favicon-48x48.png',
                type: 'image/png',
                sizes: '48x48',
            },
            {
                url: '/favicons/favicon-72x72.png',
                type: 'image/png',
                sizes: '72x72',
            },
            {
                url: '/favicons/favicon-96x96.png',
                type: 'image/png',
                sizes: '96x96',
            },
            {
                url: '/favicons/favicon-144x144.png',
                type: 'image/png',
                sizes: '144x144',
            },
            {
                url: '/favicons/android-icon-192x192.png',
                type: 'image/png',
                sizes: '192x192',
            },
            {
                url: '/favicons/favicon-512x512.png',
                type: 'image/png',
                sizes: '512x512',
            },
        ],
        shortcut: [
            {
                url: '/favicons/favicon.ico',
                type: 'image/x-icon',
            },
        ],
        apple: [
            {
                url: '/favicons/apple-icon-57x57.png',
                sizes: '57x57',
            },
            {
                url: '/favicons/apple-icon-60x60.png',
                sizes: '60x60',
            },
            {
                url: '/favicons/apple-icon-72x72.png',
                sizes: '72x72',
            },
            {
                url: '/favicons/apple-icon-76x76.png',
                sizes: '76x76',
            },
            {
                url: '/favicons/apple-icon-114x114.png',
                sizes: '114x114',
            },
            {
                url: '/favicons/apple-icon-120x120.png',
                sizes: '120x120',
            },
            {
                url: '/favicons/apple-icon-144x144.png',
                sizes: '144x144',
            },
            {
                url: '/favicons/apple-icon-152x152.png',
                sizes: '152x152',
            },
            {
                url: '/favicons/apple-icon-180x180.png',
                sizes: '180x180',
            },
        ],
        other: [
            {
                rel: 'manifest',
                url: '/manifest.json',
            },
        ],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark light',
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: 'white',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: 'black',
        },
    ],
};

const lora = Lora({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            dir="ltr"
            className={lora.className}
        >
            <head>
                <meta
                    name="msapplication-config"
                    content="/browserconfig.xml"
                />
                <meta
                    name="msapplication-TileImage"
                    content="/favicons/ms-icon-144x144.png"
                />
                <meta
                    name="msapplication-TileColor"
                    content="#ffffff"
                />
                <meta
                    name="theme-color"
                    content="#ffffff"
                />
            </head>
            <body className="py-4 container">
                <ApolloClientProvider>
                    <main
                        className="main"
                        aria-label="Main content"
                    >
                        {children}
                    </main>
                </ApolloClientProvider>

                <Suspense fallback={null}>
                    <MatomoAnalytics />
                </Suspense>
            </body>
        </html>
    );
}
