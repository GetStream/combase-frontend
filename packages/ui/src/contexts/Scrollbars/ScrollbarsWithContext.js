import { ScrollContextProvider } from './ScrollContextProvider';
import { useScrollbars } from './useScrollbars';
import { Scrollbars as RCScrollbars } from 'rc-scrollbars';

const Scrollbars = (props) => {
	const scrollbars = useScrollbars();

	return <RCScrollbars {...props} onScrollFrame={scrollbars.onScroll} />
}

export const ScrollbarsWithContext = ({ children, type, ...rest }) => (
	<ScrollContextProvider type={type}>
		<Scrollbars {...rest}>
			{children}
		</Scrollbars>
	</ScrollContextProvider>
);