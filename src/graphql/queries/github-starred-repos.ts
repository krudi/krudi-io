import { gql } from '@apollo/client';

export const STARRED_REPOS_QUERY = gql`
    query StarredRepos($login: String!, $first: Int = 6) {
        user(login: $login) {
            starredRepositories(first: $first, orderBy: { field: STARRED_AT, direction: DESC }) {
                nodes {
                    ... on Repository {
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
                }
            }
        }
    }
`;
