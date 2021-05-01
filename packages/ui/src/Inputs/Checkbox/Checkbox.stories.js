import styled from 'styled-components';

import { Box } from '../../Layout';

import { Checkbox } from '.';

const Root = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`

export const Default = () => <Checkbox size={16} />;

export default {
    component: Checkbox,
	decorators: [
		Story => (
			<Root>
				<Story />
			</Root>
		),
	],
    title: 'inputs/Checkbox',
};
