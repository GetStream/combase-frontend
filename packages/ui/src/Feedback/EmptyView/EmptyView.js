import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { layout, space } from '@combase.app/styles';

import { Box, Container } from '../../Layout';
import { Text } from '../../Text';

const Root = styled(Box)`
    ${layout};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Label = styled(Text)`
    ${space};
    text-align: center;
    user-select: none;
`;

const EmptyView = forwardRef(({ backgroundColor, children, color, error, gap, icon, iconColor, loading, size, title, ...rest }, ref) => (
    <Root {...rest} backgroundColor={backgroundColor} borderRadius={3} ref={ref}>
        <Container maxWidth={16}>
            {icon || null}
            {title ? (
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
    backgroundColor: 'textA.2',
    color: 'altTextA.56',
    gap: 2,
    minHeight: [14, 16],
    size: 4,
    title: 'Nothing to show.',
    paddingX: 6,
    paddingY: 6,
};

export default EmptyView;
