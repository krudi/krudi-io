import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
        },
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    user: {
                        keyArgs: ['login'],
                        merge: (_, incoming) => incoming,
                    },
                },
            },
        },
    }),
});

export default client;
