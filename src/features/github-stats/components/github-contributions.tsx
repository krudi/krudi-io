import { serverEnv } from '@config/server-env';

import { GITHUB_ACTIVITY_ITEMS } from '../constants';
import { fetchGitHubGraphQL } from '../lib/github-graphql';
import { GITHUB_ACTIVITY_QUERY } from '../lib/queries/github-activity';
import { isGitHubIssue, isGitHubRepo } from '../lib/type-guards';
import type { GitHubActivityQuery, GitHubActivityQueryVariables, GitHubIssue, GitHubRepo } from '../types';

type ActivityItem = {
    id: string;
    url: string;
    title: string;
    description?: string | null;
    meta?: string;
    pill?: {
        text: string;
        className?: string;
        color?: string | null;
    };
};

function buildActivityItems(repos: GitHubRepo[], issues: GitHubIssue[], limit: number): ActivityItem[] {
    const repoItems = repos.map((repo: GitHubRepo) => ({
        id: `repo-${repo.id}`,
        url: repo.url,
        title: repo.nameWithOwner ?? repo.name,
        description: repo.description,
        pill: repo.primaryLanguage?.name
            ? { text: repo.primaryLanguage.name, color: repo.primaryLanguage.color }
            : undefined,
    }));

    const issueItems = issues.map((issue: GitHubIssue) => ({
        id: `issue-${issue.id}`,
        url: issue.url,
        title: issue.title,
        meta: `@ ${issue.repository.nameWithOwner}`,
        pill: {
            text: issue.state.toLowerCase(),
            className: `state-${issue.state.toLowerCase()}`,
            color: issue.state === 'CLOSED' ? 'var(--c-danger)' : 'var(--c-success)',
        },
    }));

    return [...repoItems, ...issueItems].slice(0, limit);
}

export default async function GitHubContributions() {
    let mixedActivity: ActivityItem[] = [];
    let hasError = false;

    try {
        const data = await fetchGitHubGraphQL<GitHubActivityQuery, GitHubActivityQueryVariables>(
            GITHUB_ACTIVITY_QUERY,
            {
                login: serverEnv.GITHUB_USERNAME,
                contributedFirst: GITHUB_ACTIVITY_ITEMS,
                issuesFirst: GITHUB_ACTIVITY_ITEMS,
            }
        );
        const contributedRepos = data.user?.repositoriesContributedTo.nodes.filter(isGitHubRepo) ?? [];
        const issues = data.user?.issues.nodes.filter(isGitHubIssue) ?? [];
        mixedActivity = buildActivityItems(contributedRepos, issues, GITHUB_ACTIVITY_ITEMS);
    } catch {
        hasError = true;
    }

    return (
        <div className="activity">
            {hasError ? (
                <p>Failed to load activity.</p>
            ) : mixedActivity.length > 0 ? (
                <ul
                    className="activity-list"
                    role="list"
                >
                    {mixedActivity.map((item: ActivityItem) => (
                        <li
                            className="activity-list-item"
                            key={item.id}
                        >
                            <a
                                className="activity-list-item-link"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.title && (
                                    <span className="activity-list-item-link-title line-clamp-2">{item.title}</span>
                                )}

                                {item.description && <span className="text-gray line-clamp-3">{item.description}</span>}

                                {item.meta && <span className="text-gray">{item.meta}</span>}

                                {item.pill && (
                                    <div>
                                        <div
                                            className={`activity-list-item-link-language ${item.pill.className ?? ''}`.trim()}
                                        >
                                            {item.pill.color && (
                                                <span
                                                    className="activity-list-item-link-language-dot"
                                                    style={{ backgroundColor: item.pill.color }}
                                                    aria-hidden
                                                />
                                            )}
                                            <span className="text-sm">{item.pill.text}</span>
                                        </div>
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
