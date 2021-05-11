import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import Box from '../../Box';
import { VirtualizedList } from '../VirtualizedList';
import { VirtualizedGrid } from '../VirtualizedGrid';

const Root = styled(Box)`
    height: 100%;

    & .virtuoso-grid-list {
        height: 100%;
        width: 100%;
        display: grid;
        grid-auto-rows: minmax(min-content, max-content);
        grid-template-columns: repeat(3, 1fr);
    }
`;

const DefaultItemContainer = props => <Box {...props} paddingX={1} />;

export const EntityList = ({ data, ItemContainer, GridContainer, totalCount, loading, mode, renderItem }) => {
    const ListComponent = mode !== 'grid' ? VirtualizedList : VirtualizedGrid;

    return (
        <Root>
            <ListComponent
                ItemContainer={ItemContainer || DefaultItemContainer}
                GridContainer={GridContainer}
                overscan={200}
				loading={loading}
                renderItem={i => renderItem(i, data?.[i])}
                totalCount={totalCount || data?.length || 0}
            />
        </Root>
    );
};
