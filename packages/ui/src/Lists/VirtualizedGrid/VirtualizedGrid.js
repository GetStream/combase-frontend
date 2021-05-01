import { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { VirtuosoGrid } from 'react-virtuoso';

import { StateDisplay } from '../../Feedback';
import { ScrollContext } from '../../contexts/Scrollbars';
import { VirtuosoScroller } from '../VirtuosoScroller';

export const VirtualizedGrid = forwardRef(({ data, endReached, GridContainer, ItemContainer, loading, onScroll, renderItem, style, totalCount }, ref) => {
	const scrollbars = useContext(ScrollContext);
	return (
		<VirtuosoGrid
			components={{
				EmptyPlaceholder: () => <StateDisplay loading={loading} text={loading ? null : undefined} />,
				Item: ItemContainer,
				List: GridContainer,
				Scroller: VirtuosoScroller,
			}}
			data={data}
			endReached={endReached}
			itemContent={renderItem}
			overscan={400}
			onScroll={onScroll || scrollbars?.onScroll}
			ref={ref}
			style={style}
			totalCount={totalCount}
		/>
	)
});

VirtualizedGrid.propTypes = {
    GridContainer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    renderItem: PropTypes.func,
    totalCount: PropTypes.number,
};
