import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorAlpha, layout, space } from '@combase.app/styles';

import Box from '../../Box';
import Container from '../../Container';
import { Text } from '../../Text';

const Root = styled(Box)`
    ${layout};
	${colorAlpha};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Label = styled(Text)`
	${colorAlpha};
    ${space};
    text-align: center;
    user-select: none;
`;

const EmptyView = forwardRef(({ backgroundColor, children, colorAlpha, color, error, gap, icon, iconColor, loading, size, title, ...rest }, ref) => (
    <Root {...rest} backgroundColor={backgroundColor} borderRadius={3} ref={ref}>
        <Container maxWidth={16}>
            {icon || null}
            {title ? (
                <Label color={color} opacity={colorAlpha} fontWeight="600" marginBottom={gap} fontSize={4}>
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
	colorAlpha: .56,
    gap: 2,
    minHeight: [14, 16],
    size: 4,
    title: 'Nothing to show.',
    paddingX: 6,
    paddingY: 6,
};

export default EmptyView;
