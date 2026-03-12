import type { GitHubIssue, GitHubRepo } from '@models';

export function isGitHubRepo(repo: GitHubRepo | null | undefined): repo is GitHubRepo {
    return repo !== null && repo !== undefined;
}

export function isGitHubIssue(issue: GitHubIssue | null | undefined): issue is GitHubIssue {
    return issue !== null && issue !== undefined;
}

export function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
