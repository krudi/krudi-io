'use client';

import { useQuery } from '@apollo/client/react';
import SkeletonCards from '@components/ui/skeleton-cards';
import { GITHUB_STAR_ITEMS } from '@constants/config';
import { STARRED_REPOS_QUERY } from '@graphql/queries/github-starred-repos';
import { isGitHubRepo } from '@lib/type-guards';
import type { GitHubRepo, StarredReposQuery, StarredReposQueryVariables } from '@types';

export default function GitHubStars() {
    const login = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

    const { data, loading, error } = useQuery<StarredReposQuery, StarredReposQueryVariables>(STARRED_REPOS_QUERY, {
        variables: { login, first: GITHUB_STAR_ITEMS },
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: false,
    });

    const starredRepos = data?.user?.starredRepositories?.nodes?.filter(isGitHubRepo) ?? [];

    return (
        <div className="activity">
            {error ? (
                <p>Failed to load starred repos.</p>
            ) : (
                <>
                    {loading ? (
                        <SkeletonCards
                            as="ul"
                            itemAs="li"
                            wrapperClassName="activity-list"
                            itemClassName="activity-list-item activity-list-item-link"
                            disableGrid
                            count={GITHUB_STAR_ITEMS}
                        />
                    ) : starredRepos.length > 0 ? (
                        <ul
                            className="activity-list"
                            role="list"
                        >
                            {starredRepos.map((repo: GitHubRepo) => (
                                <li
                                    className="activity-list-item"
                                    key={repo.id}
                                >
                                    <a
                                        className="activity-list-item-link"
                                        href={repo.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {repo.nameWithOwner ? (
                                            <span className="activity-list-item-link-title line-clamp-2">
                                                {repo.nameWithOwner}
                                            </span>
                                        ) : repo.name ? (
                                            <span className="activity-list-item-link-title line-clamp-2">
                                                {repo.name}
                                            </span>
                                        ) : null}

                                        {repo.description && (
                                            <span className="text-gray line-clamp-3">{repo.description}</span>
                                        )}

                                        {repo.primaryLanguage?.name && (
                                            <div className="activity-list-item-link-language">
                                                <span
                                                    className="activity-list-item-link-language-dot"
                                                    style={{
                                                        backgroundColor:
                                                            repo.primaryLanguage.color ?? 'var(--c-white-200)',
                                                    }}
                                                    aria-hidden
                                                />
                                                <span className="text-sm">{repo.primaryLanguage.name}</span>
                                            </div>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nothing to show yet.</p>
                    )}
                </>
            )}
        </div>
    );
}
