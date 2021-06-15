import React from 'react';
import styled from 'styled-components';
import { connectHits, Configure as AlgoliaConfig, InstantSearch, connectSearchBox } from 'react-instantsearch-dom';
import { GET_TAGS } from '@combase.app/apollo';
import { Box, Chip, EmptyView, IconButton, ListItem, MoreIcon, AlgoliaSearchToolbar, TagIcon, Text, useEntities } from '@combase.app/ui';

import { algolia } from 'utils/search';

import { TagEntity } from 'components/Entities';

const Toolbar = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled(Box)`
	display: flex;
	align-items: center;
`;

const connectAlgoliaProps = (wrapped) => connectSearchBox(connectHits(wrapped));

const TagList = connectAlgoliaProps(({ tags, currentRefinement, hits }) => {
	if (currentRefinement) {
		return hits?.length ? hits.map((node) => {
			return (
				<ListItem columnTemplate="1fr min-content" key={node?.objectID}>
					<TagEntity name={node?.name} />
					<IconButton color="altText" icon={MoreIcon} />
				</ListItem>	
			)
		}) : <EmptyView icon={<TagIcon size={8} color="altText" fillAlpha={0.64} />} title="No Tags match your search." />
	}

	return tags?.length ? tags?.map(({ node }) => {
		return (
			<ListItem columnTemplate="1fr min-content" key={node?._id}>
				<TagEntity name={node?.name} />
				<IconButton color="altText" icon={MoreIcon} />
			</ListItem>
		)
	}) : <EmptyView icon={<TagIcon size={8} color="altText" fillAlpha={0.64} />} title="No Tags." />
});

const ListHeader = connectAlgoliaProps(({ tagCount, currentRefinement, hits }) => {
	const count = (currentRefinement ? hits?.length : tagCount) || 0;
	return (
		<Toolbar minHeight={9}>
			<Title>
				<Text fontSize={5} lineHeight={7}>Tags</Text>
				<Chip marginLeft={3} color="text" variant="ghost" size="sm" label={count} />
			</Title>
		</Toolbar>
	);
});

const OrganizationTagsSettings = () => {
	const [tags, { organization }] = useEntities(GET_TAGS);

	return (
		<InstantSearch indexName="TAGS" searchClient={algolia}>
			<AlgoliaConfig filters={`organization:${organization}`} />
			<Box>
				<ListHeader tagCount={tags?.count} />
				<AlgoliaSearchToolbar />
				<TagList tags={tags?.edges} />
			</Box>
		</InstantSearch>
	);
};

export default OrganizationTagsSettings;