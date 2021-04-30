import { InMemoryCache, makeVar } from '@apollo/client';
import { breakpoints } from '@combase.app/styles';
import orderBy from 'lodash.orderby';

import { authenticationVar, themeVar } from './variables';

let bpMap = {};

const handleMediaChange = name => ({ matches }) => {
    return bpMap[name]?.(matches);
};

Object.entries(breakpoints)
    .slice(9)
    .forEach(([name, value], i) => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia(`(min-width: ${value})`);
            bpMap[name] = makeVar(mediaQuery.matches);

            const onchange = handleMediaChange(name);
            mediaQuery.onchange = onchange;
        }
    });

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                auth: {
                    read: () => authenticationVar(),
                },
                flatFeed: {
                    keyArgs: ['id'],
                },
                theme: {
                    read: () => themeVar(),
                },
                me: {
                    fields: {
                        keyFields: ['_id'],
                    },
                },
                tickets: {
                    keyArgs: ['filter', ['status']],
                    read(existing) {
                        return existing || { edges: [], count: 0, hasMore: false };
                    },
                },
                media: {
                    keyArgs: ['bp'],
                    read: (_, { args: { bp } }) => {
                        if (!bp || !bpMap[bp]) {
                            return;
                        }

                        return bpMap[bp]();
                    },
                },
            },
        },
        Faq: {
            keyFields: ['shortId'],
            fields: {
                title(_, { readField }) {
                    const content = readField('content')?.[0]?.children;

                    // Find the text content of the first paragraph tag.
                    const title = content?.find(({ type }) => type === 'h1')?.children?.[0]?.text;
                    return title || 'Untitled.';
                },
                excerpt(_, { args, readField }) {
                    const content = readField('content')?.[0]?.children;

                    // Find the text content of the first paragraph tag.
                    const firstParagraph = content?.find(({ type }) => type === 'p')?.children?.[0]?.text;
                    return firstParagraph || 'Click to edit.';
                },
            },
        },
		Group: {
			fields: {
				color(existing) {
					return existing || 'primary';
				}
			}
		},
        Tag: {
            /**
             * API has a compound index on orgID and name,
             * you can only ever auth as one org at a time so
             * we can uniquely identify tags by name and get offline
             * first functionality for adding/removing
             */
            keyFields: ['name'],
        },
        Organization: {
            fields: {
                agent: {
                    keyArgs: ['_id', 'organization'],
                },
                faqs: {
                    keyArgs: [['filter', 'status']],
                },
            },
        },
        TicketList: {
            fields: {
                edges: {
                    read(existing) {
                        return existing || [];
                    },
                    merge(existing, incoming, { readField }) {
                        const merged = existing ? existing.slice(0) : [];

                        // Obtain a Set of all existing ticket IDs.
                        const existingIdSet = new Set(merged.map(({ node: ticket }) => readField('_id', ticket)));

                        // Remove incoming tickets already present in the existing data.
                        incoming = incoming.filter(({ node: ticket }) => !existingIdSet.has(readField('_id', ticket)));

                        const tickets = [...incoming, ...merged];

                        return orderBy(
                            tickets,
                            ({ node: ticket }) => readField('latestMessageAt', ticket) || readField('updatedAt', ticket),
                            'desc'
                        );
                    },
                },
            },
        },
        Ticket: {
            fields: {
                latestMessage: {
                    read(existing) {
                        return existing || '';
                    },
                },
                unread: {
                    read(existing) {
                        return existing || 0;
                    },
                },
                latestMessageAt: {
                    read(existing) {
                        return existing || null;
                    },
                },
                priority(existing = 0) {
                    return existing;
                },
                starred(existing = false) {
                    return existing;
                },
            },
        },
        StreamFlatFeed: {
            fields: {
                activities: {
                    keyArgs: false,
                    merge: (existing, incoming, { args, readField }) => {
                        const { options } = args;
                        const incomingSize = incoming?.length || 0;
                        const existingSize = existing?.length || 0;

                        const merged = existing ? existing.slice(0) : [];

                        // Obtain a Set of all existing activity IDs.
                        const existingIdSet = new Set(merged.map(activity => readField('id', activity)));

                        // Remove incoming activities already present in the existing data.
                        // eslint-disable-next-line no-param-reassign
                        incoming = incoming.filter(activity => !existingIdSet.has(readField('id', activity)));

                        // Find the index of the activity just before the incoming page of activity.
                        const afterIndex = merged.findIndex(activity => options?.id_lt === readField('id', activity));

                        if (incomingSize > existingSize) {
                            /*
                             * If first incoming activity count is greater than than the existing activity count
                             * then the incoming activities should be added to the top of the list.
                             *
                             * incoming subscription payloads include all existing activities, where as incoming paginated
                             * payloads only include the next X - so we can assume that any incoming value with a greater `length`
                             * is either the first result, or a subscription payload and should be prepended to the list.
                             */
                            merged.unshift(...incoming);
                        } else if (afterIndex >= 0) {
                            // If we found afterIndex, insert incoming after that index.
                            merged.splice(afterIndex + 1, 0, ...incoming);
                        } else {
                            // Otherwise insert incoming at the end of the existing list.
                            merged.push(...incoming);
                        }

                        return merged;
                    },
                },
            },
        },
        User: {
            keyFields: ['_id', 'email'],
        },
    },
});
