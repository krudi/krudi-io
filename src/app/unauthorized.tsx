import Link from 'next/link';

// Not called anywhere currently — kept ready for when a real auth/permission model needs it.
export default function Unauthorized() {
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
            <h1 style={{ fontSize: 'var(--heading-4)' }}>401 — Unauthorized</h1>
            <p style={{ color: 'var(--c-gray)' }}>You need to sign in to view this page.</p>
            <Link href="/">Back to home</Link>
        </main>
    );
}
