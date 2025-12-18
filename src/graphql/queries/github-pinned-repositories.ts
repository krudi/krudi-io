import { gql } from '@apollo/client';

export const PINNED_REPOS_QUERY = gql`
    query PinnedRepos($login: String!) {
        user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        id
                        name
                        description
                        url
                        stargazerCount
                        forkCount
                        primaryLanguage {
                            name
                        }
                    }
                }
            }
        }
    }
`;
