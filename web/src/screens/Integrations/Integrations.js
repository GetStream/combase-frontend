import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, GET_INTEGRATION_DEFINITIONS } from '@combase.app/apollo';

import { Box, Container, PageCard, PageHeader, Tab, Tabs } from '@combase.app/ui';

import { IntegrationGridItem } from 'components/IntegrationGridItem';
import EntityList from 'components/EntityList';

const TabWrapper =  styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const GridContainer = styled(Container).attrs(props => ({
    ref: props.listRef,
    variant: 'fluid',
}))`
    &.virtuoso-grid-list {
        display: grid;
        grid-auto-rows: minmax(min-content, max-content);
        grid-template-columns: repeat(4, 1fr);
        grid-gap: ${({ theme }) => theme.space[4]};
    }
`;

const queryOpts = { fetchPolicy: 'cache-and-network' };

const Integrations = () => {
	const [filterCategory, setFilterCategory] = useState();
	const { data } = useQuery(GET_INTEGRATION_DEFINITIONS, queryOpts);
    const integrations = data?.integrationDefinitions;

	return (
		<PageCard variant="withHeader">
			<PageHeader 
				variant="fluid" 
				title="Integrations" 
				showOrganization
			>
				<TabWrapper variant="fluid" marginBottom={4}>
					<Tabs onChange={setFilterCategory} value={filterCategory}>
						<Tab label="All" value={undefined} />
						<Tab label="CRM" value="crm" />
						<Tab label="Email" value="email" />
						<Tab label="Sync" value="sync" />
						<Tab label="Source" value="source" />
					</Tabs>
				</TabWrapper>
			</PageHeader>
			<EntityList
				data={integrations}
				ItemContainer={Box}
				GridContainer={GridContainer}
				renderItem={(_, integration = {}) => (
					<IntegrationGridItem
						icon={integration?.icon}
						id={integration?.id}
						name={integration?.name}
						version={integration?.internal?.version}
						enabled={integration?.integrationData?.enabled}
					/>
				)}
				totalCount={integrations?.length}
				mode="grid"
			/>
		</PageCard>
	);
}

export default Integrations;