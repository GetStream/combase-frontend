import { useTheme } from 'styled-components';
import { useAsyncFn, useMedia } from 'react-use';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { getChannel, useChatClient } from '@combase.app/chat';
import { GraphQLClient } from 'graphql-request';
import { useContextSelector } from 'use-context-selector';

import WidgetContext from './context';

const client = new GraphQLClient(process.env.STORYBOOK_API_URL || 'http://localhost:8080/graphql');
// const client = new GraphQLClient(process.env.STORYBOOK_API_URL || 'https://combase-api.ngrok.io/graphql');
const getOrg = (query, _id) =>
    client.request(query, {}, { ['combase-organization']: _id, ['combase-timezone']: Intl.DateTimeFormat().resolvedOptions().timeZone });
const selector = ({ organization }) => organization;

export const useOrganization = () => {
    const organization = useContextSelector(WidgetContext, selector);

    const { data, error, loading } = useSWR(
        organization
            ? [
                  `query getOrganization {
					organization {
						_id
						branding {
							logo
						}
						widget {
							home {
								title
								tagline
							}
						}
						name
						stream {
							key
						}
						availableAgents {
							_id
							name {
								display
							}
							avatar
						}
					}
				}`,
                organization,
              ]
            : null,
        getOrg
    );

    return [data?.organization, loading, error];
};

export const useOrganizationStreamKey = organization => {
    const { data, loading, error } = useSWR(
        organization
            ? [
                  `query getStreamKey {
				organization {
					stream {
						key
					}
				}
			}`,
                  organization,
              ]
            : null,
        getOrg
    );

	console.log(loading, error);

    return [data?.organization?.stream?.key, loading, error];
};

const authSelector = ({ auth, setAuth }) => [auth, setAuth];
export const useCreateTicket = () => {
    const history = useHistory();
    const organization = useContextSelector(WidgetContext, selector);
    const [auth, setAuth] = useContextSelector(WidgetContext, authSelector);
    const chatClient = useChatClient();

    return useAsyncFn(
        async values => {
            try {
                let variables = values || { record: {} };

                if (!variables?.user && !variables?.record?.user) {
                    variables.record = {
                        ...variables.record,
                        user: auth.user,
                    };
                }

                const headers = {
                    ['combase-organization']: organization,
                };

                const data = await client.request(
                    `mutation handleCreateTicket($record: CreateTicketInput!, $user: UserInput) {
					ticketCreate(record: $record, user: $user) {
						record {
							_id
						}
						user {
							record {
								_id
								streamToken
							}
						}
					}
				}`,
                    variables,
                    headers
                );

                if (!chatClient.user || chatClient.user.id === '!anon') {
                    setAuth({
                        user: data?.ticketCreate?.user?.record?._id,
                        token: data?.ticketCreate?.user?.record?.streamToken,
                    });

                    chatClient.disconnect();
                    await chatClient.connectUser({ id: data.ticketCreate.user.record._id }, data.ticketCreate.user.record.streamToken);
                }

                const ticketId = data?.ticketCreate.record._id;
                await getChannel(chatClient, 'combase', ticketId);

                history.push(`/c/${data?.ticketCreate.record._id}`);
            } catch (error) {
                console.error(error);
            }
        },
        [chatClient, organization]
    );
};

export const useWidgetIsContained = () => {
    const theme = useTheme();
    return useMedia(`(min-width: ${theme.breakpoints[1]})`);
};
