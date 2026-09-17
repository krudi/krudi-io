import { serverEnv } from '@config/server-env';

import { GITHUB_STAR_ITEMS } from '../constants';
import { fetchGitHubGraphQL } from '../lib/github-graphql';
import { STARRED_REPOS_QUERY } from '../lib/queries/github-starred-repos';
import { isGitHubRepo } from '../lib/type-guards';
import type { GitHubRepo, StarredReposQuery, StarredReposQueryVariables } from '../types';

export default async function GitHubStars() {
    let starredRepos: GitHubRepo[] = [];
    let error = false;

    try {
        const data = await fetchGitHubGraphQL<StarredReposQuery, StarredReposQueryVariables>(STARRED_REPOS_QUERY, {
            login: serverEnv.GITHUB_USERNAME,
            first: GITHUB_STAR_ITEMS,
        });
        starredRepos = data.user?.starredRepositories.nodes.filter(isGitHubRepo) ?? [];
    } catch {
        error = true;
    }

    return (
        <div className="activity">
            {error ? (
                <p>Failed to load starred repos.</p>
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
                                    <span className="activity-list-item-link-title line-clamp-2">{repo.name}</span>
                                ) : null}

                                {repo.description && <span className="text-gray line-clamp-3">{repo.description}</span>}

                                {repo.primaryLanguage?.name && (
                                    <div className="activity-list-item-link-language">
                                        <span
                                            className="activity-list-item-link-language-dot"
                                            style={{
                                                backgroundColor: repo.primaryLanguage.color ?? 'var(--c-white-200)',
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
        </div>
    );
}
