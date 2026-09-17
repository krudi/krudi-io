import Link from 'next/link';

export default function NotFound() {
    return (
        <main
            className="container"
            style={{
                minHeight: '60svh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacer)',
                textAlign: 'center',
            }}
        >
            <h1 style={{ fontSize: 'var(--heading-4)' }}>404 — Page not found</h1>
            <p style={{ color: 'var(--c-gray)' }}>The page you're looking for doesn't exist or has been moved.</p>
            <Link href="/">Back to home</Link>
        </main>
    );
}
