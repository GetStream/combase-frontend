import React from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import { IconLabel } from '../IconLabel';
import { ChevronRightIcon } from '../icons/chevronRight';
import {Text} from './Text';

const Root = styled(IconLabel)`
    ${interactions};
    text-decoration: none;
    user-select: none;
`;

const TextLink = ({ children, ...props }) => (
    <Root {...props} interaction="opacity">
        <Text>{children}</Text>
        <ChevronRightIcon />
    </Root>
);

export default TextLink;
