import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { itemGap, shadow } from '@combase.app/styles';

import Avatar from '../../Avatar';
import { Box } from '../../Layout';
import { PageTitle } from '../../PageTitle';
import { Text } from '../../Text';
import { ListItem } from '../ListItem';
import { PageHeader } from '../../PageHeader';
import { Entity } from '../Entity';

import { VirtualizedGrid } from '.';

const Root = styled(Box)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
})`
    ${shadow.boxShadow};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    width: 35rem;
    max-width: calc(100% - 4rem);
    height: 40rem;
    overflow: hidden;
    resize: horizontal;
`;

const Labels = styled(Box)`
    & * + * {
        ${itemGap};
    }
`;

const GridContainer = styled(Box).attrs(props => ({
    ref: props.listRef,
    paddingX: 4,
}))`
    &.virtuoso-grid-list {
        display: grid;
        grid-auto-rows: minmax(min-content, max-content);
        grid-template-columns: repeat(3, 1fr);
    }
`;

const ItemContainer = props => <Box {...props} paddingX={3} />;

export const Default = () => (
    <Root backgroundColor="background">
        <Card borderRadius={4} boxShadow={6}>
            <Box as={animated.div} backgroundColor="surface" paddingX={6} paddingY={5}>
                <PageTitle title="Tickets" />
            </Box>
            <VirtualizedGrid
                GridContainer={GridContainer}
                ItemContainer={ItemContainer}
                overscan={500}
                renderItem={() => (
                    <Box>
                        <Entity icon={<Avatar name="Luke" size={6} />}>
                            <Text fontSize={3} fontWeight="600" lineHeight={3}>
                                {'Luke'}
                            </Text>
                        </Entity>
                    </Box>
                )}
                totalCount={100}
            />
        </Card>
    </Root>
);

const GridRoot = styled(Box)`
    position: relative;
	display: grid;
	grid-template-rows: min-content 1fr;
	height: 100vh;
`;

export const EntityGrid = () => (
	<GridRoot>
		<PageHeader title="Agents" />
		<VirtualizedGrid
			GridContainer={GridContainer}
			ItemContainer={ItemContainer}
			overscan={500}
			renderItem={() => (
				<Box>
					<Entity icon={<Avatar name="Luke" size={6} />}>
						<Text fontSize={3} fontWeight="600" lineHeight={3}>
							{'Luke'}
						</Text>
					</Entity>
				</Box>
			)}
			totalCount={100}
		/>
	</GridRoot>
);

export default {
    component: Default,
    title: 'Lists/VirtualizedGrid',
};
