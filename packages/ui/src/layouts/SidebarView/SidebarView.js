import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Scrollbars } from 'rc-scrollbars';

import { Box, Container } from '../../Layout';

const Root = styled(Box)`
    width: 100%;
    display: grid;
`;

const Wrapper = styled(Container).attrs({
    paddingBottom: 8,
    variant: 'fluid',
})`
    display: grid;
    grid-template-columns: ${({ columnTemplate }) => columnTemplate || '25% 1fr'};
    grid-column-gap: ${({ theme }) => theme.space[8]};
`;

export const SidebarView = ({ children, columnTemplate, Sidebar }) => {
    return (
        <Scrollbars>
            <Root>
                <Wrapper columnTemplate={columnTemplate}>
                    <Box>{Sidebar || null}</Box>
                    {children}
                </Wrapper>
            </Root>
        </Scrollbars>
    );
};

SidebarView.propTypes = {
    columnTemplate: PropTypes.string,
    Sidebar: PropTypes.element,
};

SidebarView.defaultProps = {
    columnTemplate: '3fr 2fr',
};
