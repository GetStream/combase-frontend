import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'rc-scrollbars';
import { interactions } from '@combase.app/styles';
import { Route } from 'react-router-dom';
import useFuse from 'react-use-fuse';

import Box from "@combase.app/ui/Box";
import Container from '@combase.app/ui/Container';
import EmptyView from '@combase.app/ui/EmptyView';
import IconLabel from "@combase.app/ui/IconLabel";
import { PluginsIcon } from "@combase.app/ui/icons";
import Modal from "@combase.app/ui/Modal";
import {SearchToolbar} from "@combase.app/ui/SearchToolbar";
import Text from "@combase.app/ui/Text";

import HeaderBase from 'components/HeaderBase';
import IntegrationItem from 'components/IntegrationItem';

import ConfigureIntegrationModal from './ConfigureIntegrationModal';

import useIntegrationDefinitions from 'hooks/useIntegrationDefinitions';

const Root = styled(Box)`
	display: grid;
	grid-template-rows: min-content 1fr;
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	border-bottom: none;
`;

const Page = styled(Box)`
	display: grid;
	grid-gap: ${({ theme }) => theme.space[2]};
	grid-template-columns: ${({ theme }) => theme.sizes.sidebar} 1fr;
`;

const StickyWrapper = styled(Box)`
	position: sticky; 
	top:  ${({ theme }) => theme.space[6]};
`;

const GridList = styled(Container)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: ${({ theme }) => theme.space[6]};
	padding-bottom: ${({ theme }) => theme.space[6]};
`;

const CategoryLink = styled(Text)`
	${interactions};
	user-select: none;
	color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
	font-weight: ${({ active, theme }) => theme.fontWeights[active ? '800' : '400']};
`;

const EmptyWrapper = styled(Box)`
	grid-column: span 3;
`;

const fuseOpts = {
	keys: ['name'],
}

const OPTS = [
	{
		name: 'CRM',
		value: "crm"
	},
	{
		name: 'Analytics',
		value: "analytics"
	},
	{
		name: 'Tickets',
		value: "tickets"
	},
	{
		name: 'Email',
		value: "email",
	},
]

const Integrations = () => {
	const [category, setCategory] = useState();

	const filter = useMemo(() => category ? ({
		category,
	}) : undefined, [category]);

	const { data, loading } = useIntegrationDefinitions(filter);
	const { integrationDefinitions } = data || {}

	const { result, search, term, reset } = useFuse({
        data: integrationDefinitions || [],
        options: fuseOpts
    })

	const items = term ? result : integrationDefinitions;

	return (
		<Root>
			<Header>
				<IconLabel gap={2}>
					<PluginsIcon color="primary" size={6} />
					<Text fontSize={5} fontWeight={600} lineHeight={7}>Integrations</Text>
				</IconLabel>
			</Header>
			<Scrollbars>
				<Page paddingY={6}>
					<Container>
						<StickyWrapper>
							<SearchToolbar onClear={reset} onChange={({ target }) => search(target.value)} value={term} />
							<Box marginY={6}>
								<Text marginBottom={5} fontSize={5} lineHeight={5} fontWeight={600}>
									Categories
								</Text>
								{
									OPTS.map(({ name, value }) => <CategoryLink active={category === value} onClick={() => setCategory(category === value ? undefined : value)} interaction="opacity" marginY={2} fontSize={4} lineHeight={6}>{name}</CategoryLink>)
								}
							</Box>
						</StickyWrapper>
					</Container>
					<GridList variant="contained" maxWidth={26}>
						{
							items?.length ?
								items?.map(({ id, description, name, integrationData }) => (
									<IntegrationItem 
										enabled={integrationData?.enabled}
										id={id}
										name={name} 
										description={description} 
									/>	
								))
							: (
								<EmptyWrapper>
									<EmptyView loading={loading} title={term ? "No integrations match your search." : "No Available Integrations."} />
								</EmptyWrapper>
							)
						}
					</GridList>
				</Page>
			</Scrollbars>
			<Route path="/integrations/:integrationId">
				{({ history, match }) => <Modal component={ConfigureIntegrationModal} id={match?.params.integrationId} open={match} onClose={history.goBack} />}
			</Route>
		</Root>
	);
};

export default Integrations;