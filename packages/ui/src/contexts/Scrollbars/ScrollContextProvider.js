import { useMemo } from 'react';
import { useSpring } from 'react-spring';
import Context from './ScrollbarsContext';

const springConfig = { friction: 50, tension: 800, mass: 1 };
const spring = () => ({ value: 0, config: springConfig });

export const ScrollContextProvider = ({ children, type }) => {
	const [anim] = useSpring(spring);

	const context = useMemo(() => ({
		anim,
		onScroll: ({ scrollTop, top }) => anim.value.start({ to: type === 'px' ? scrollTop : top }),
		threshold: type === 'px' ? 64 : 0.32
	}), [type]);
	
	return (
		<Context.Provider value={context}>
			{children}
		</Context.Provider>
	)
};