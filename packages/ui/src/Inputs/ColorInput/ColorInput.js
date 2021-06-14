import React from 'react';
import styled from 'styled-components';
import { border } from '@combase.app/styles';

import Box from '../../Box';
import Text from '../../Text';
import TextGroup from '../../TextGroup';

import { useInput } from '../shared/useInput';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: min-content 1fr;
	grid-gap: ${({ theme }) => theme.space[3]};
	cursor: pointer;
`;

const Content = styled(TextGroup)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Input = styled.input`
	width: ${({ theme }) => theme.sizes[10]};
	height: ${({ theme }) => theme.sizes[10]};
	-webkit-appearance: none;
	border: none;
	border-radius: 50%;

	&::-webkit-color-swatch-wrapper {
		padding: 0;
		border-radius: 50%;
		overflow: hidden;
	}
	&::-webkit-color-swatch {
		border: none;
	}
`;

const ColorInput = (props) => {
	const {
		label,
		name, 
		onBlur,
		onChange,
		onFocus,
		onKeyDown,
		value,
	} = props;

	const [inputProps, { focused, hasValue }] = useInput({
		name,
		onBlur,
		onChange,
		onFocus,
		onKeyDown,
		value,
	});

	return (
		<Root>
			<Input {...inputProps} type="color" />
			<Content>
				<Text color="altText" fontWeight="400">
					{label}:
				</Text>
				<Text>{inputProps.value || '#000000'}</Text>
			</Content>
		</Root>
	);
}

export default ColorInput;