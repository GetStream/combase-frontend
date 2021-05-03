import { gql, useQuery } from '@combase.app/apollo';

export const GET_BREAKPOINT = gql`
    query getBreakpoint($bp: String!) {
        matches: media(bp: $bp) @client
    }
`;

export const useReactiveMedia = bp => {
    const { data } = useQuery(GET_BREAKPOINT, { fetchPolicy: 'cache-only', variables: { bp } });
    return data;
};
