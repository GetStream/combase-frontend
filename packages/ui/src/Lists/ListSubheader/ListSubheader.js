import React from 'react';
import { Box } from '../../Layout';
import { Text } from '../../Text';

export const ListSubheader = ({ children, ...rest }) => (
    <Box {...rest}>
        <Text color="altTextA.64" fontSize={2} fontWeight="600" lineHeight={4}>
            {children}
        </Text>
    </Box>
);


ListSubheader.defaultProps = {
	paddingY: 1,
}