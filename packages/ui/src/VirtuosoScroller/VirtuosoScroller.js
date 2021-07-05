import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'rc-scrollbars'; 
import Box from '../Box';

const style = {
	WebkitOverflowScrolling: "touch",
	backfaceVisibility: "hidden",
	height: "100%",
	outline: "none",
	overflowY: "hidden",
	position: "relative",
};

const Track = styled(Box)`
	position: absolute;
	top: ${({ theme }) => theme.space[3]};
	right: ${({ theme }) => theme.space[1]};
	bottom: ${({ theme }) => theme.space[3]};
	display: none;

	@media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		display: block;
	}
`;

const VirtuosoScroller = forwardRef(({ children, onScroll, tabIndex }, ref) => {
	return (
		<Scrollbars
			autoHide
			autoHideTimeout={3000}
			autoHideDuration={500}
			style={style}
			tabIndex={tabIndex}
			renderThumbVertical={() => <Box borderRadius={4} backgroundColor="altText" backgroundColorAlpha={0.56} width="0.25rem" />}
			ref={
				(sRef) => {
					if (ref && sRef) {
						if (typeof ref === 'function') {
							ref(sRef.view ?? null);
							return;
						}

						ref.current = sRef.view;
					}
				}
			} 
			onScrollFrame={onScroll}
		>	
			{children}
		</Scrollbars>
	)
});

export default VirtuosoScroller;