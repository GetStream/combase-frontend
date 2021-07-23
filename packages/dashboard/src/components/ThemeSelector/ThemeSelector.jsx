import React from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { interactions } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import ButtonBase from '@combase.app/ui/ButtonBase';
import {useControlledValue} from '@combase.app/ui/shared/useControlledValue';
import Text from '@combase.app/ui/Text';

import { setUITheme } from 'apollo/operations/ui';
import { themeVar } from 'apollo/variables';

import ThemeSelectorIllustration from './ThemeSelectorIllustration';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: ${({ theme }) => theme.space[4]};
`;

const Button = styled(ButtonBase)`
	& svg {
		${interactions};
		user-select: none;
	}
	text-align: center;
`;

const ThemeSelector = () => {
	const themeMode = useReactiveVar(themeVar);

	return (
		<Root>
			<Button active={themeMode === 'system'} type="button" interaction="bump" onClick={(value) => setUITheme(value)} value="system">
				<ThemeSelectorIllustration />
				<Text color={themeMode === 'system' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>System (auto)</Text>
			</Button>
			<Button active={themeMode === 'light'} type="button" interaction="bump" onClick={(value) => setUITheme(value)} value="light">
				<ThemeSelectorIllustration theme="light" />
				<Text color={themeMode === 'light' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>Light</Text>
			</Button>
			<Button active={themeMode === 'dark'} type="button" interaction="bump" onClick={(value) => setUITheme(value)} value="dark">
				<ThemeSelectorIllustration theme="dark" />
				<Text color={themeMode === 'dark' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>Dark</Text>
			</Button>
		</Root>
	);
};

export default ThemeSelector;
