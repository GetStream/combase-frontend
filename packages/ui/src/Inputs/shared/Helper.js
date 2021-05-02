import React from 'react';
import PropTypes from 'prop-types';

import { InfoIcon } from '../../icons';
import { IconLabel } from '../../IconLabel';
import { Box } from '../../Layout';
import { Text } from '../../Text';

export const Helper = ({ color, icon: Icon = InfoIcon, text, paddingX, paddingY }) => (
    <Box paddingX={paddingX} paddingY={paddingY}>
        <IconLabel>
            <Icon color={color || 'yellow'} size={1} />
            <Text as="span" color={color || 'lavenderA.56'} variant="label">
                {text}
            </Text>
        </IconLabel>
    </Box>
);

Helper.propTypes = {
    text: PropTypes.string.isRequired,
};

Helper.defaultProps = {
    paddingX: 4,
    paddingY: 1,
};
