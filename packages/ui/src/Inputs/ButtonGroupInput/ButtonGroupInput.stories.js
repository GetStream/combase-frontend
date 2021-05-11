import styled from 'styled-components';
import { useState } from 'react';
import { capitalCase } from 'change-case';

import { ButtonGroupInput } from '.';
import Box from '../../Box';
import Card from '../../Card';
import { ListSubheader } from '../../Lists';

const Root = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`

export default {
	title: 'Inputs/ButtonGroupInput',
	decorators: [
		Story => (
			<Root>
				<Story />
			</Root>
		),
	],
	component: ButtonGroupInput,
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const options = days.map((value) => ({
	label: capitalCase(value).slice(0,3),
	value
}))

export const Default = () => {
	const [value, handleChange] = useState();
	return (
		<Card padding={3} boxShadow={2}>
			<ListSubheader paddingX={1} marginBottom={2}>
				Select a day:
			</ListSubheader>
			<ButtonGroupInput onChange={e => handleChange(e.target.value)} options={options} value={value} />
		</Card>
	)
};