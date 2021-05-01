import styled from 'styled-components';
import { useMemo } from 'react';

import { ScrollContextProvider, useScrollbars } from '../../contexts/Scrollbars';

import { useBulkSelect } from '../../hooks';
import { Box, Container } from '../../Layout';
import { TagListItem, VirtualizedList } from '../../Lists';
import { Checkbox } from '../../Inputs';
import {CardHeader} from '../CardHeader';

import Card from './Card';

const Root = styled(Container)`
    max-width: 16rem;

    & ${Card} {
		display: grid;
		grid-template-rows: min-content 1fr;
        min-height: 20rem;
    }
`;

const ItemContainer = styled(Box).attrs({ paddingX: 1, paddingBottom: 'small' })``

const langs = [
	'react',
	'react-native',
	'javascript',
	'java',
	'kotlin',
	'dart',
	'flutter',
	'ios',
	'swift',
	'python',
	'go',
]

export const Default = () => {
	const { anim } = useScrollbars();
	const [listItemProps, bulkCheckboxProps] = useBulkSelect(langs);
	
	const style = useMemo(() => ({
		boxShadow: anim.value.to({
			output: [0, 0.1],
			range: [0, 32],
			extrapolate: 'clamp'
		}).to(a => `0px 0px 12px -2px rgba(0, 0, 0, ${a})`)
	}), []);

	return (
		<Root>
			<Card boxShadow={4}>
				<CardHeader gapLeft={1} actionLabel="Add Tag" icon={<Checkbox {...bulkCheckboxProps} />} style={style}>
					Add Tags
				</CardHeader>
				<VirtualizedList 
					totalCount={100}
					ItemContainer={ItemContainer}
					renderItem={(i) => {
						const _id = langs[i % langs.length];
						return <TagListItem {...listItemProps} name={langs[i % langs.length]} value={_id} />
					}}
				/>
			</Card>
		</Root>
	);
}

export default {
    component: Default,
	decorators: [
		Story => (
			<ScrollContextProvider type="px">
				<Story />
			</ScrollContextProvider>
		)
	],
    title: 'Cards/Card',
};
