'use client';

import '@styles/styles.css';

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <main
                    className="container"
                    style={{
                        minHeight: '100svh',
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
                        An unexpected application error occurred. Try again — if the problem persists, come back later.
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
            </body>
        </html>
    );
}
