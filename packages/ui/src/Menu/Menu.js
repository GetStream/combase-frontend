import { forwardRef } from 'react';
import styled from 'styled-components';
import { layout, shadow } from '@combase.app/styles';

import Box from '../Box';
import List from '../List';
import ListSubheader from '../ListSubheader';

const Root = styled(Box)`
    ${shadow.boxShadow};
    ${layout.minWidth};
    ${layout.maxHeight};
    outline: 0;
    pointer-events: auto;
    overflow-y: auto;
    overflow-x: hidden;
	backface-visibility: none;

    & > ul {
        position: relative;
        padding-top: ${({ theme }) => theme.space[2]};
        padding-bottom: ${({ theme }) => theme.space[2]};

        &:first-of-type {
            padding-top: ${({ $hasSubheading, theme }) => ($hasSubheading ? 0 : theme.space[2])};
        }
    }
`;

const Menu = forwardRef(({ children, footer, header, subheading, ...rest }, ref) => (
    <Root $hasSubheading={subheading} {...rest} ref={ref}>
        {header || null}
        {subheading ? (
            <Box paddingX={4}>
                <ListSubheader>{subheading}</ListSubheader>
            </Box>
        ) : null}
        <List>{children}</List>
        {footer || null}
    </Root>
));

export default Menu;
