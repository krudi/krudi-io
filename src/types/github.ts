export type GitHubRepo = {
    id: string;
    name: string;
    nameWithOwner?: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    primaryLanguage: {
        name: string;
        color?: string | null;
    } | null;
};

export type GitHubIssue = {
    id: string;
    title: string;
    url: string;
    createdAt: string;
    state: 'OPEN' | 'CLOSED';
    repository: {
        nameWithOwner: string;
    };
};

export type PinnedReposQuery = {
    user: {
        pinnedItems: {
            nodes: Array<GitHubRepo | null>;
        };
    } | null;
};

export type PinnedReposQueryVariables = {
    login: string;
    first?: number;
};

export type GitHubActivityQuery = {
    user: {
        repositoriesContributedTo: {
            nodes: Array<GitHubRepo | null>;
        };
        issues: {
            nodes: Array<GitHubIssue | null>;
        };
    } | null;
};

export type GitHubActivityQueryVariables = {
    login: string;
    contributedFirst?: number;
    issuesFirst?: number;
};

export type StarredReposQuery = {
    user: {
        starredRepositories: {
            nodes: Array<GitHubRepo | null>;
        };
    } | null;
};

export type StarredReposQueryVariables = {
    login: string;
    first?: number;
};
