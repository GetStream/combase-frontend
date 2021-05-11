import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, layout, system } from '@combase.app/styles';

import Box from '../Box';
import Placeholder from '../Placeholder';
import { Text } from '../Text';

const Root = styled(Box)`
    ${color};
    ${layout};
    display: inline-flex;
    flex-shrink: 0;
    background-size: cover;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Initials = styled(Text)`
    text-transform: capitalize;
    user-select: none;
    align-self: center;
    letter-spacing: 0;
	pointer-events: none;
	${system({
		size: {
			properties: ['font-size', 'line-height'],
			scale: 'fontSizes',
			transform: (value, scale) => scale[Math.max(value - 2, 0)]
		},
	})}
`;

const Avatar = forwardRef(({ avatarStyle, backgroundColor, name, size, src, variant, ...props }, ref) => (
	<Root
		as={!src && !name ? Placeholder : 'div'}
		backgroundColor={backgroundColor}
		borderRadius={variant}
		height={size}
		width={size}
		ref={ref}
		{...props}
	>
		{src ? (
			<img alt={name} src={src} />
		) : (
			<Initials color="white" fontWeight="700" size={size}>
				{name?.charAt(0) || ''}
			</Initials>
		)}
	</Root>
));

Avatar.propTypes = {
    backgroundColor: PropTypes.string,
    name: PropTypes.string,
    fontSize: PropTypes.number,
    size: PropTypes.number,
    src: PropTypes.string,
    variant: PropTypes.oneOf(['squircle', 'circle']),
};

Avatar.defaultProps = {
    backgroundColor: 'primary',
    size: 8,
    variant: 'squircle',
};

export default Avatar;