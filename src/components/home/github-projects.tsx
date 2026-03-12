'use client';

import { useQuery } from '@apollo/client/react';
import SkeletonCards from '@components/ui/skeleton-cards';
import { GITHUB_PINNED_ITEMS } from '@constants/config';
import { PINNED_REPOS_QUERY } from '@graphql/queries/github-pinned-repositories';
import { isGitHubRepo } from '@lib/type-guards';
import type { GitHubRepo, PinnedReposQuery, PinnedReposQueryVariables } from '@models';
import { Star } from 'lucide-react';

export default function Projects() {
    const login = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;
    const { data, loading, error } = useQuery<PinnedReposQuery, PinnedReposQueryVariables>(PINNED_REPOS_QUERY, {
        variables: { login, first: GITHUB_PINNED_ITEMS },
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: false,
    });

    const repos = data?.user?.pinnedItems?.nodes?.filter(isGitHubRepo) ?? [];

    return (
        <div>
            {error ? (
                <p>Failed to load pinned projects.</p>
            ) : loading ? (
                <SkeletonCards
                    as="ul"
                    itemAs="li"
                    wrapperClassName="github-projects-list row"
                    itemClassName="github-projects-list-item col-4 github-projects-list-item-link"
                    disableGrid
                    count={GITHUB_PINNED_ITEMS}
                />
            ) : repos.length > 0 ? (
                <ul
                    className="github-projects-list row"
                    role="list"
                >
                    {repos.map((repo: GitHubRepo) => (
                        <li
                            key={repo.id}
                            className="github-projects-list-item col-4"
                        >
                            <a
                                className="github-projects-list-item-link"
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="github-projects-list-item-link-star text-sm">
                                    <Star className="text-warning" />
                                    {repo.stargazerCount}
                                </span>
                                <div>
                                    {repo.name && (
                                        <span className="github-projects-list-item-link-title">{repo.name}</span>
                                    )}

                                    {repo.description && <p className="text-gray">{repo.description}</p>}
                                </div>

                                <div>
                                    {repo.primaryLanguage?.name && (
                                        <div className="github-projects-list-item-link-language">
                                            <span
                                                className="github-projects-list-item-link-language-dot"
                                                style={{
                                                    backgroundColor: repo.primaryLanguage.color ?? 'var(--c-white-200)',
                                                }}
                                                aria-hidden
                                            />
                                            <span className="text-sm">{repo.primaryLanguage.name}</span>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    No pinned projects yet. Pin repositories on{' '}
                    <a
                        href="https://github.com/krudi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>{' '}
                    to show them here.
                </p>
            )}
        </div>
    );
}
