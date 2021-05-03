import styled from 'styled-components';
import { Box } from '@combase.app/ui';

const SidebarGroup = styled(Box)`
	& > div, & > a {
		height: ${({ theme }) => theme.space[7]};
		width: ${({ theme }) => theme.space[7]};
		display: flex;
		align-items: center;
		justify-content: center;

	}

	& > * + * {
		margin-top: ${({ gap, theme }) => theme.space[gap || 1]};
	}
`;

export default SidebarGroup;