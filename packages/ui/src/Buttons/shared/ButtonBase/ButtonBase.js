import React, { useCallback, forwardRef } from 'react';
import styled from 'styled-components';

import { Box } from '../../../Layout';

const Root = styled(Box)`
	margin: 0;
	border: 0;
`;

const ButtonBase = forwardRef(({ as, children, className, onClick, type, value, ...rest }, ref) => {
	const handleClick = useCallback((e) => {
		if (onClick) {
			onClick(value, e);
		}
	}, [onClick, value]);

	return <Root {...rest} data-testid="button-base" as={as} children={children} className={className} onClick={handleClick} ref={ref} type={type} />;
})

ButtonBase.defaultProps = {
	as: 'button',
}

export default ButtonBase;