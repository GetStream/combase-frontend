import { gql } from '@combase.app/apollo';
import styled from 'styled-components';
import { ScrollContextProvider } from '../../contexts/Scrollbars/index';

import { Box } from '../../Layout';
import { AgentListItem } from "../../Lists/AgentListItem";
import { EntityListView } from "./EntityListView";

const GET_AGENTS = gql`
	query {
		entities: agents {
			edges {
				node {
					_id
					createdAt
					avatar
					name {
						display
						full
					}
					role
				}
			}
			count
		}
	}
`;

const Root = styled(Box)`
	height: 100vh;
`

const renderItem = ({ node } = {}, additionalProps = {}) => {
	return (
		<AgentListItem 
			{...additionalProps} 
			avatar={node?.avatar} 
			createdAt={node?.createdAt}
			name={node?.name?.display} 
			_id={node?._id} 
			onClick={_id => console.log(`/dashboard/agent/${node?._id}`)} 
			groups={node?.groups} 
			role={node?.role} 
			value={node?._id} 
		/>
	)
}

export const Default = () => (
	<EntityListView
		columnTemplate="1fr 1.5fr 0.5fr 1fr" 
		query={GET_AGENTS}
		renderItem={renderItem}
	/>
);

export default {
	title: 'layouts/EntityListView',
	decorators: [Story => (
		<ScrollContextProvider type="px">
			<Root>
				<Story />
			</Root>
		</ScrollContextProvider>
	)],
	component: EntityListView,
}