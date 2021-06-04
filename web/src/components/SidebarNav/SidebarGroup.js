import styled from 'styled-components';
import { Box } from '@combase.app/ui';

const SidebarGroup = styled(Box)`
	width: 100%;

	& > div, & > a {
		display: flex;
		align-items: center;
		justify-content: center;

	}

	& > * + * {
		margin-top: ${({ gap, theme }) => theme.space[gap || 1]};
	}
`;

export default SidebarGroup;