import { serverEnv } from '@config/server-env';

interface GitHubGraphQLResponse<TData> {
    data?: TData;
    errors?: Array<{ message: string }>;
}

// The access token must never reach the client — only call this from a Server Component or route handler, never 'use client' code.
export async function fetchGitHubGraphQL<TData, TVariables extends Record<string, unknown>>(
    query: string,
    variables: TVariables
): Promise<TData> {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${serverEnv.GITHUB_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(`GitHub GraphQL request failed with status ${response.status}`);
    }

    const json = (await response.json()) as GitHubGraphQLResponse<TData>;

    if (json.errors?.length) {
        throw new Error(`GitHub GraphQL error: ${json.errors[0]?.message}`);
    }

    if (!json.data) {
        throw new Error('GitHub GraphQL response is missing data');
    }

    return json.data;
}
