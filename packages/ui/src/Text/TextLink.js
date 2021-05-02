import React from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import { IconLabel } from '../IconLabel';
import { Text } from '../Text';
import { ChevronRightIcon } from '../icons/chevronRight';

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
