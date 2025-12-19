'use client';

import { useQuery } from '@apollo/client/react';
import SkeletonCards from '@components/ui/skeleton-cards';
import { GITHUB_ACTIVITY_ITEMS } from '@constants/config';
import { GITHUB_ACTIVITY_QUERY } from '@graphql/queries/github-activity';
import { isGitHubIssue, isGitHubRepo } from '@lib/type-guards';
import type { GitHubActivityQuery, GitHubActivityQueryVariables, GitHubIssue, GitHubRepo } from '@types';

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

export default function GitHubContributions() {
    const login = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;

    const { data, loading, error } = useQuery<GitHubActivityQuery, GitHubActivityQueryVariables>(
        GITHUB_ACTIVITY_QUERY,
        {
            variables: {
                login,
                contributedFirst: GITHUB_ACTIVITY_ITEMS,
                issuesFirst: GITHUB_ACTIVITY_ITEMS,
            },
            fetchPolicy: 'cache-first',
            nextFetchPolicy: 'cache-first',
            notifyOnNetworkStatusChange: false,
        }
    );

    const contributedRepos = data?.user?.repositoriesContributedTo?.nodes?.filter(isGitHubRepo) ?? [];

    const issues = data?.user?.issues?.nodes?.filter(isGitHubIssue) ?? [];

    const mixedActivity = buildActivityItems(contributedRepos, issues, GITHUB_ACTIVITY_ITEMS);

    const hasError = Boolean(error);

    return (
        <div className="activity">
            {hasError ? (
                <p>Failed to load activity.</p>
            ) : (
                <>
                    {loading ? (
                        <SkeletonCards
                            as="ul"
                            itemAs="li"
                            wrapperClassName="activity-list"
                            itemClassName="activity-list-item activity-list-item-link"
                            disableGrid
                            count={GITHUB_ACTIVITY_ITEMS}
                        />
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
                                            <span className="activity-list-item-link-title line-clamp-2">
                                                {item.title}
                                            </span>
                                        )}

                                        {item.description && (
                                            <span className="text-gray line-clamp-3">{item.description}</span>
                                        )}

                                        {item.meta && <span className="text-gray">{item.meta}</span>}

                                        {item.pill && (
                                            <div>
                                                {item.pill && (
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
                                                )}
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
