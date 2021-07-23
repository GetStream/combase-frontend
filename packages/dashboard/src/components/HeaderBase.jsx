import styled from 'styled-components';
import Container from '@combase.app/ui/Container';

const HeaderBase = styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border };
`;

HeaderBase.defaultProps = {
	height: 'header',
};

export default HeaderBase;