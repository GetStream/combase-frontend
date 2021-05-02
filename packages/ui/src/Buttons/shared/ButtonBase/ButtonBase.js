import React, { useCallback } from 'react';
import styled from 'styled-components';

const Root = styled.button``;

const ButtonBase = ({ as, className, onClick, type, value }) => {
	const handleClick = useCallback((e) => {
		onClick(e, value);
	}, [onClick, value]);

	return <Root data-testid="button-base" as={as} className={className} onClick={handleClick} type={type} />;
}

export default ButtonBase;