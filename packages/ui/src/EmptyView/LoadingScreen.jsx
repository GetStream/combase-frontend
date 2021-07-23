import React from 'react';
import styled from 'styled-components';

import EmptyView from './EmptyView';
import Spinner from '../Spinner';

const LoadingScreen = styled(EmptyView).attrs({
	children: null,
	icon: <Spinner size={6} />,
	title: '',
})`
    background: none;
`;

export default LoadingScreen;
