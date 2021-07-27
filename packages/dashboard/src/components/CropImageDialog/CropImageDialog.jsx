import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { AddImageIcon } from '@combase.app/ui/icons'; 

import Dialog from 'components/Dialog';

const CropImageDialog = forwardRef((props, ref) => {
	return (
		<Dialog icon={AddImageIcon} ref={ref} title='Crop Image'>
			Crop avatar
		</Dialog>
	);
});

export default CropImageDialog;