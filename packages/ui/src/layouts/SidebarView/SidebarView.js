import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Scrollbars } from 'rc-scrollbars';

import { Container } from '../../Layout';
import { PageCard } from '../../Cards';

const Wrapper = styled(PageCard).attrs({
    paddingBottom: 8,
    variant: 'fluid',
})`
    display: grid;
    grid-template-columns: ${({ columnTemplate }) => columnTemplate || '25% 1fr'};
    ${'' /* grid-column-gap: ${({ theme }) => theme.space[8]}; */}
`;

const SidebarWrapper = styled(Container)`
	border-right: 1px solid ${({ theme }) => theme.colors.border};
`

export const SidebarView = ({ children, columnTemplate, Sidebar }) => {
    return (
        <Scrollbars>
			<Wrapper columnTemplate={columnTemplate}>
				<SidebarWrapper>{Sidebar || null}</SidebarWrapper>
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
