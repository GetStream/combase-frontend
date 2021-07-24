import React from 'react';
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
`;

const fuseOpts = {
	keys: ['name'],
}

const Integrations = () => {
	const { data } = useIntegrationDefinitions();
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
								<CategoryLink interaction="opacity" marginY={2} fontSize={4} lineHeight={6}>CRM</CategoryLink>
								<CategoryLink interaction="opacity" marginY={2} fontSize={4} lineHeight={6}>Email</CategoryLink>
								<CategoryLink interaction="opacity" marginY={2} fontSize={4} lineHeight={6}>Analytics</CategoryLink>
								<CategoryLink interaction="opacity" marginY={2} fontSize={4} lineHeight={6}>Automation</CategoryLink>
							</Box>
						</StickyWrapper>
					</Container>
					<GridList variant="contained" maxWidth={25}>
						{
							items?.length ?
								items?.map(({ id, name }) => (
									<IntegrationItem 
										id={id}
										name={name} 
										description={'Track events triggered in Combase through Google Analytics.'} 
									/>	
								))
							: <EmptyView title={term ? "No integrations match your search." : "No Available Integrations."} />
						}
					</GridList>
				</Page>
			</Scrollbars>
			<Route path="/integrations/:integrationId">
				{({ history, match }) => <Modal component={ConfigureIntegrationModal} open={match} onClose={history.goBack} />}
			</Route>
		</Root>
	);
};

export default Integrations;