import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Scrollbars } from 'rc-scrollbars';

import { Box, Container } from '../../Layout';
import { PageCard } from '../../Cards';

const Wrapper = styled(Container).attrs({
    paddingBottom: 8,
    variant: 'fluid',
})`
	min-height: 100vh;
    display: grid;
    grid-template-columns: ${({ columnTemplate }) => columnTemplate || '25% 1fr'};
    grid-column-gap: ${({ theme }) => theme.space[8]};
`;

export const SidebarView = ({ children, columnTemplate, Sidebar }) => {
    return (
        <Scrollbars>
			<Wrapper columnTemplate={columnTemplate}>
				<Box>{Sidebar || null}</Box>
				{children}
			</Wrapper>
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
