import { gql } from '@apollo/client';

export const GITHUB_ACTIVITY_QUERY = gql`
    fragment ActivityRepository on Repository {
        id
        name
        nameWithOwner
        description
        url
        stargazerCount
        primaryLanguage {
            name
            color
        }
    }

    fragment ActivityIssue on Issue {
        id
        title
        url
        createdAt
        state
        repository {
            nameWithOwner
        }
    }

    query GitHubActivity($login: String!, $contributedFirst: Int = 12, $issuesFirst: Int = 5) {
        user(login: $login) {
            repositoriesContributedTo(
                first: $contributedFirst
                contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
                privacy: PUBLIC
                orderBy: { field: PUSHED_AT, direction: DESC }
            ) {
                nodes {
                    ...ActivityRepository
                }
            }
            issues(first: $issuesFirst, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                    ...ActivityIssue
                }
            }
        }
    }
`;
