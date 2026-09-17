import type { GitHubIssue, GitHubRepo } from '../types';

export function isGitHubRepo(repo: GitHubRepo | null | undefined): repo is GitHubRepo {
    return repo !== null && repo !== undefined;
}

export function isGitHubIssue(issue: GitHubIssue | null | undefined): issue is GitHubIssue {
    return issue !== null && issue !== undefined;
}
