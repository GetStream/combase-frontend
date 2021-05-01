import React, { forwardRef, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Virtuoso } from 'react-virtuoso';

import { StateDisplay } from '../../Feedback';
import { ScrollContext } from '../../contexts/Scrollbars';
import { VirtuosoScroller } from '../VirtuosoScroller';

const Item = styled.div`
    overflow: hidden;
`;

const style = {
    height: '100%',
    width: '100%',
};

export const VirtualizedList = forwardRef(
    ({ EmptyPlaceholder, ItemContainer, ListContainer, data, onScroll, endReached, loading, renderItem, totalCount, ...rest }, ref) => {
        const scrollbars = useContext(ScrollContext);
        return (
            <Virtuoso
                components={{
                    EmptyPlaceholder: () =>
                        EmptyPlaceholder ? <EmptyPlaceholder /> : <StateDisplay loading={loading} text={loading ? null : undefined} />,
                    Item: ItemContainer || Item,
                    List: ListContainer || undefined,
                    Scroller: VirtuosoScroller,
                }}
                data={data}
                endReached={endReached}
                itemContent={renderItem}
                overscan={400}
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
