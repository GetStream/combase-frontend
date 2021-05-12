import React from 'react';
import Box from '../../Box';
import Text from '../../Text';

export const ListSubheader = ({ children, ...rest }) => (
    <Box {...rest}>
        <Text color="altText" fontSize={2} fontWeight="600" lineHeight={4}>
            {children}
        </Text>
    </Box>
);


ListSubheader.defaultProps = {
	paddingY: 1,
}