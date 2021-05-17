import { forwardRef } from 'react';
import { Scrollbars } from 'rc-scrollbars'; 

const VirtuosoScroller = forwardRef(({ children, onScroll, ...rest}, ref) => {
	return (
		<Scrollbars
			autoHide
			autoHideTimeout={3000}
			autoHideDuration={500}
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
			{...rest}
			onScrollFrame={onScroll}
		>	
			{children}
		</Scrollbars>
	)
});

export default VirtuosoScroller;