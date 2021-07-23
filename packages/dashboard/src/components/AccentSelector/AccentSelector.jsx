import React from 'react';
import styled, { useTheme } from 'styled-components';
import { interactions, itemGap } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import ButtonBase from '@combase.app/ui/ButtonBase';
import {AddIcon, CheckCircleIcon} from '@combase.app/ui/icons';
import {useControlledValue} from '@combase.app/ui/shared/useControlledValue';
import {useInput} from '@combase.app/ui/shared/useInput';

const Root = styled(Box)`
	display: flex;
	align-items: center;
	& > button + button {
		${itemGap}
	}
`;

const AccentOption = styled(ButtonBase).attrs(props => ({
	children: props.active ? <CheckCircleIcon color="white" size={5} /> : null
}))`
	${interactions};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AddButton = styled(AccentOption).attrs({
	children: <AddIcon size={6} color="altText" />
})`
	border: 3px solid ${({ theme }) => theme.colors.altText};
`;

const options = ['blue', 'red', 'purple', 'green', 'yellow'];
const AccentSelector = ({ name, onBlur, onChange, onFocus, value }) => {
	const theme = useTheme();

	const [inputProps] = useInput({
		name,
		onBlur,
		onChange,
		onFocus,
		value 
	});

	return (
		<Root gapLeft={7}>
			{
				options.map((opt) => {
					const color = theme.colors[opt];
					return (
						<AccentOption 
							active={color === inputProps.value}
							interaction="bump" 
							size={9} 
							backgroundColor={opt} 
							borderRadius="circle" 
							onClick={() => inputProps.onChange({
								target: {
									name,
									value: color
								}
							})}
							value={color}
							type="button"
						/>
					);
				})
			}
			<AddButton 
				interaction="opacity" 
				size={9} 
				borderRadius="circle"
				type="button"
			/>
		</Root>
	);
};

export default AccentSelector;
