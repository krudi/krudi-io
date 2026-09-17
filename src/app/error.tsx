'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
            <h1 style={{ fontSize: 'var(--heading-4)' }}>Something went wrong</h1>
            <p style={{ color: 'var(--c-gray)', maxWidth: '32rem' }}>
                We couldn't load this page. Try again — if the problem persists, come back later.
            </p>
            <button
                type="button"
                onClick={() => reset()}
                style={{
                    border: '1px solid var(--c-white-200)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '0.5rem 1rem',
                    background: 'none',
                    cursor: 'pointer',
                }}
            >
                Try again
            </button>
        </main>
    );
}
