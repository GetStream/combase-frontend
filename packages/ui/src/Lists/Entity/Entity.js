import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../../Layout';
import { TextGroup } from '../../Text';

const Root = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Entity = ({ icon, children, className, gapTop }) => {
    return (
        <Root className={className}>
            {icon || null}
            <TextGroup gapTop={gapTop} marginLeft={icon ? 3 : 0}>
                {children}
            </TextGroup>
        </Root>
    );
};

Entity.propTypes = {
    icon: PropTypes.node,
    gapTop: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

Entity.defaultProps = {
    gapTop: 'small',
};
