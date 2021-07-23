import React, { forwardRef, useContext, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Virtuoso } from 'react-virtuoso';

import { ScrollContext } from '../contexts/Scrollbars';
import VirtuosoScroller from '../VirtuosoScroller';

const Item = styled.div`
	width: 100%;
`;

const style = {
    height: '100%',
    width: '100%'
};

const VirtualizedList = forwardRef(
    ({ EmptyPlaceholder, ItemContainer, ListContainer, data, onScroll, endReached, loading, overscan, renderItem, totalCount, ...rest }, ref) => {
        const scrollbars = useContext(ScrollContext);

		const components = useMemo(() => ({
			Item: ItemContainer || Item,
			List: ListContainer || undefined,
			Scroller: VirtuosoScroller,
		}), [EmptyPlaceholder, loading, ItemContainer, ListContainer]);

        return (
            <Virtuoso
                components={components}
                data={data}
                endReached={endReached}
                itemContent={renderItem}
                overscan={overscan}
                ref={ref}
                style={style}
                onScroll={onScroll || scrollbars?.onScroll}
                totalCount={totalCount}
                {...rest}
            />
        );
    }
);

VirtualizedList.propTypes = {
    data: PropTypes.any,
    endReached: PropTypes.func,
    initialTopMostItemIndex: PropTypes.number,
    ItemContainer: PropTypes.any,
    ListContainer: PropTypes.any,
    loading: PropTypes.bool,
    overscan: PropTypes.number,
    renderItem: PropTypes.func,
    totalCount: PropTypes.number,
};

export default VirtualizedList;
