import React from 'react';

import Box from '../Box';
import IconLabel from '../IconLabel';
import { InfoIcon } from '../icons';
import Text from '../Text';
import Tooltip from '../Tooltip';

const ListSubheader = ({ children, infoText, ...rest }) => (
    <Box {...rest}>
        <IconLabel>
			<Text color="altText" fontSize={2} fontWeight="600" lineHeight={4}>
				{children}
			</Text>
			{
				infoText ? (
					<Tooltip text={infoText}>
						<Box>
							<InfoIcon color="altText" />
						</Box>
					</Tooltip>
				) : null
			}
		</IconLabel>
    </Box>
);


ListSubheader.defaultProps = {
	paddingY: 1,
}

export default ListSubheader;