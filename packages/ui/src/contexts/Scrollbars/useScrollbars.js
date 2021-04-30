import { useContext } from 'react';
import ScrollbarsContext from './ScrollbarsContext'

export const useScrollbars = () => {
	const context = useContext(ScrollbarsContext);
	return context;
}