import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorAlpha, interactions, layout, space } from '@combase.app/styles';

import Box from '../Box';
import Container from '../Container';
import Spinner from '../Spinner';
import Text from '../Text';

const Root = styled(Box)`
	${interactions};
    ${layout};
	${colorAlpha};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
	user-select: none;
	cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};
`;

const Label = styled(Text)`
    ${space};
    text-align: center;
    user-select: none;
`;

const EmptyView = forwardRef(({ backgroundColor, children, color, error, gap, icon, iconColor, loading, onClick, size, title, ...rest }, ref) => (
    <Root {...rest} backgroundColor={backgroundColor} interaction={onClick ? 'highlight' : undefined} borderRadius={3} onClick={onClick} ref={ref}>
        <Container maxWidth={17}>
            {!loading ? icon : <Spinner color="text" />}
            {!loading && title ? (
                <Label color={color} fontWeight="600" marginBottom={gap} fontSize={4}>
                    {title}
                </Label>
            ) : null}
            {children}
        </Container>
    </Root>
));

EmptyView.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};

EmptyView.defaultProps = {
    backgroundColor: 'text',
	backgroundColorAlpha: 0.02,
    color: 'altText',
    gap: 2,
    minHeight: [14, 16],
    size: 4,
    title: 'Nothing to show.',
    paddingX: 6,
    paddingY: 6,
};

export default EmptyView;
