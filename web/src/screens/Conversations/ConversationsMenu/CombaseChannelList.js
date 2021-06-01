import React from 'react';
import { Container } from '@combase.app/ui';

const CombaseChannelList = ({ children }) => {
	return (
		<Container paddingBottom={3}>
			{children}
		</Container>
	);
};

export default CombaseChannelList;