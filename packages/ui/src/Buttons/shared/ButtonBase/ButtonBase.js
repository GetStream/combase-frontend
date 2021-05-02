import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Box } from '../../../Layout';

const Root = styled(Box)``;

const ButtonBase = ({ as, children, className, onClick, type, value, ...rest }) => {
	const handleClick = useCallback((e) => {
		onClick(e, value);
	}, [onClick, value]);

	return <Root {...rest} data-testid="button-base" as={as} children={children} className={className} onClick={handleClick} type={type} />;
}

ButtonBase.defaultProps = {
	as: 'button',
}

export default ButtonBase;