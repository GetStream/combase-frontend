import { useCallback, useEffect } from 'react';
import { gql, useLazyQuery, useMutation } from '@combase.app/apollo';

const TOGGLE_LABEL = gql`
    mutation toggleTicketLabel($_id: MongoID!, $label: EnumTicketLabels!) {
        ticket: ticketToggleLabel(ticket: $_id, label: $label) {
            _id
            starred
            priority
        }
    }
`;

const GET_LABELS = gql`
    query getTicketLabels($_id: MongoID!) {
        organization {
            _id
            ticket(_id: $_id) {
                _id
                starred
                priority
            }
        }
    }
`;

// TODO Pretty sure we can use useMutation to fetch & update in the same hook...
export const useTicketLabels = _id => {
    const [toggleTicketLabel] = useMutation(TOGGLE_LABEL);
    const [getTicketLabels, { data }] = useLazyQuery(GET_LABELS, { variables: { _id } });

    const handleToggle = useCallback(
        label => {
            const labels = data?.organization?.ticket.labels || [];
            const hasLabel = labels?.includes(label);

            const optimisticResponse = {
                __typename: 'Mutation',
                ticket: {
                    __typename: 'Ticket',
                    _id,
                    labels,
                },
            };

            toggleTicketLabel({
                optimisticResponse,
                update: (cache, { data: { ticket } }) => {
                    const previous = cache.readQuery({
                        query: GET_LABELS,
                        variables: {
                            _id,
                            label,
                        },
                    });

                    cache.writeQuery({
                        data: {
                            ...previous,
                            ...ticket,
                        },
                        query: GET_LABELS,
                        variables: {
                            _id,
                            label,
                        },
                    });
                },
                variables: {
                    _id,
                    label,
                },
            });
        },
        [_id, data, toggleTicketLabel]
    );

    useEffect(() => {
        if (_id) {
            getTicketLabels();
        }
    }, [_id, getTicketLabels]);

    return [
        {
            priority: data?.organization?.ticket?.labels?.includes('priority'),
            starred: data?.organization?.ticket?.labels?.includes('starred'),
        },
        handleToggle,
    ];
};
