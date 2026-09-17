import { serverEnv } from '@config/server-env';
import { Star } from 'lucide-react';

import { GITHUB_PINNED_ITEMS } from '../constants';
import { fetchGitHubGraphQL } from '../lib/github-graphql';
import { PINNED_REPOS_QUERY } from '../lib/queries/github-pinned-repositories';
import { isGitHubRepo } from '../lib/type-guards';
import type { GitHubRepo, PinnedReposQuery, PinnedReposQueryVariables } from '../types';

export default async function GitHubProjects() {
    let repos: GitHubRepo[] = [];
    let error = false;

    try {
        const data = await fetchGitHubGraphQL<PinnedReposQuery, PinnedReposQueryVariables>(PINNED_REPOS_QUERY, {
            login: serverEnv.GITHUB_USERNAME,
            first: GITHUB_PINNED_ITEMS,
        });
        repos = data.user?.pinnedItems.nodes.filter(isGitHubRepo) ?? [];
    } catch {
        error = true;
    }

    return (
        <div>
            {error ? (
                <p>Failed to load pinned projects.</p>
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
