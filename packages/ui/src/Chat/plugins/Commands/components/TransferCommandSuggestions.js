import { forwardRef, useCallback, useState, useMemo } from 'react';
import { gql, SEARCH_AGENTS, useMutation, useLazyQuery } from '@combase.app/apollo';
import { useChannel } from '@combase.app/chat';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAsync, useDebounce } from 'react-use';
import { useSlate } from 'slate-react';

import Avatar from '../../../../Avatar';
import { StateDisplay } from '../../../../Feedback';
import { MenuItem } from '../../../../Lists';
import { Dropdown } from '../../../../Popovers';

const AgentIem = styled(MenuItem)`
    min-height: 2.25rem;

    & pre {
        background-color: ${({ theme }) => theme.colors.border}70;
        color: ${({ theme }) => theme.colors.primary};
        white-space: pre-wrap;
        line-height: normal;
        font-size: 80%;
        font-family: 'Inter', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        padding: 0.25rem 0.4rem;
        margin: 0 -0.125rem;
        border-radius: 0.5rem;
    }
`;

const TRANSFER_TICKET = gql`
    mutation transferTicket($ticket: MongoID!, $agent: MongoID!) {
        ticketTransfer(_id: $ticket, agent: $agent) {
            agents
        }
    }
`;

const TransferCommandSuggestions = forwardRef(({ query, valueIndex, ...props }, ref) => {
    const editor = useSlate();
    const history = useHistory();
    const channel = useChannel();

    const [search, { data, loading: searching, called, error }] = useLazyQuery(SEARCH_AGENTS);
    const [handleTransfer, { loading: transferring }] = useMutation(TRANSFER_TICKET);
    const [debouncedQuery, setDebouncedQuery] = useState();

    const [, cancel] = useDebounce(
        () => {
            setDebouncedQuery(query);
        },
        500,
        [query]
    );

    useAsync(async () => {
        if (query) {
            await search({
                variables: {
                    query: debouncedQuery,
                },
            });
        }
    }, [debouncedQuery]);

    const results = data?.organization?.results;

    const emptyText = useMemo(() => {
        if (called) {
            return 'No agents found.';
        }
        return 'Start typing to search agents.';
    }, [called]);

    const onSelectAgent = useCallback(
        async _id => {
            try {
                editor.clearEditor();

                await handleTransfer({
                    variables: {
                        ticket: channel.id,
                        agent: _id,
                    },
                    update() {
                        history.push('/dashboard/conversations/inbox');
                    },
                });
            } catch (error) {}
        },
        [editor]
    );

    return (
        <Dropdown {...props} ref={ref}>
            {!searching && results?.length ? (
                results.map(({ avatar, _id, name }) => (
                    <AgentIem
                        key={_id}
                        label={name?.display}
                        icon={Avatar}
                        iconProps={{ src: avatar, name: name?.display }}
                        onClick={() => onSelectAgent(_id)}
                    />
                ))
            ) : (
                <StateDisplay loading={searching} text={searching ? '' : emptyText} />
            )}
        </Dropdown>
    );
});

export default TransferCommandSuggestions;
