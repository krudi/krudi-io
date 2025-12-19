import GitHubContributions from '@components/home/github-contributions';
import GitHubStars from '@components/home/github-stars';
import { Suspense } from 'react';

import Projects from '@/components/home/github-projects';

export default async function Page() {
    const login = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

    return (
        <>
            <header
                className="header"
                aria-label="Introduction and summary"
            >
                <p className="header-subtitle fw-500">Hello, my name is Patryk</p>

                <h1>I make websites.</h1>

                <div>
                    <p>
                        I&apos;m a full stack developer who cares about accessible, thoughtful interfaces and steady
                        architecture. I enjoy building tools, civic tech, and making the web feel friendlier.
                    </p>

                    <p>
                        I like working with React, Next.js, TypeScript, Vue, TYPO3, and a sprinkle of tooling to keep
                        things maintainable.
                    </p>
                    <p>
                        I care about open source and building secure, reliable software that helps people. I like
                        shipping small, useful projects and want to keep doing more of that, with users in mind and a
                        focus on learning and collaboration.
                    </p>
                </div>

                <div className="header-social-links">
                    <a
                        href="https://www.linkedin.com/in/patryk-kudlik"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/krudi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a href="mailto:patryk.kudlik@gmail.com">Email</a>
                </div>
            </header>

            <section aria-label="Featured projects and pinned GitHub repositories">
                <h2 page-heading-counter="true">Projects</h2>

                <Suspense>
                    <Projects />
                </Suspense>
            </section>

            <div className="row">
                <section
                    className="col-6"
                    aria-label="GitHub repos I contributed to and issues I opened"
                >
                    <div className="activity-section-heading">
                        <h2 page-heading-counter="true">
                            <a
                                href={`https://github.com/${login}?tab=overview`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Repos I contributed
                            </a>
                        </h2>
                    </div>
                    <GitHubContributions />
                </section>

                <section
                    className="col-6"
                    aria-label="GitHub repositories I starred"
                >
                    <div className="activity-section-heading">
                        <h2 page-heading-counter="true">
                            <a
                                href={`https://github.com/${login}?tab=stars`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Repos I like
                            </a>
                        </h2>
                    </div>
                    <GitHubStars />
                </section>
            </div>

            <section
                className="section-contact"
                aria-label="Contact"
            >
                <h2 page-heading-counter="true">Let&apos;s talk</h2>
                <p>
                    Reach me at <a href="mailto:patryk.kudlik@gmail.com">patryk.kudlik@gmail.com</a> and I&apos;ll get
                    back to you soon.
                </p>
            </section>
        </>
    );
}
