import React, { useCallback } from 'react';
import styled from 'styled-components';

import Box from '../../Box';
import { Button } from '../../Buttons';
import { Icon } from '../../Icon';
import { StateDisplay } from '../../Feedback';
import { Text } from '../../Text';

import { useInput } from '../shared';

const Root = styled(Box)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Options = styled(Button)`
	margin-right: .25rem;
	margin-bottom: .25rem;
`;

export const ButtonGroupInput = ({ name, options, onBlur, onChange, onFocus, value = [], ...rest }) => {
	const [inputProps] = useInput({
		name,
		onBlur,
		onChange,
		onFocus,
		value,
	});

	const onClick = useCallback(e => {
		const idx = inputProps.value.findIndex((v) => v === e);
		let newValue;
		if (idx === -1) {
			newValue = [...inputProps.value, e];
		} else {
			newValue = [...inputProps.value];
			newValue.splice(idx, 1);
		}
		
		inputProps.onChange({
			target: {
				name,
				value: newValue,
			}
		});
	}, [inputProps, name]);

	const renderItem = useCallback(({ icon, label, value }) => (
		<Options size="xs" key={value} color={inputProps.value?.includes(value) ? 'primary' : 'text'} variant={inputProps.value?.includes(value) ? 'raised' : 'flat'} onClick={() => onClick(value)} type="button">
			{icon ? <Icon icon={icon} /> : null}
			<Text>{label}</Text>
		</Options>
	), [inputProps.value, onClick])

	return options?.length ? (
		<Root {...rest}>
			{options.map(renderItem)}
		</Root>
	) : <StateDisplay />
};