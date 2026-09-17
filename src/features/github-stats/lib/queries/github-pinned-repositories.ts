export const PINNED_REPOS_QUERY = `
    query PinnedRepos($login: String!, $first: Int = 6) {
        user(login: $login) {
            pinnedItems(first: $first, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        id
                        name
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
