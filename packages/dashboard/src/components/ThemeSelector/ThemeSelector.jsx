import React, { useCallback } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';
import { useMedia } from 'react-use';

import Box from '@combase.app/ui/Box';
import ButtonBase from '@combase.app/ui/ButtonBase';
import Text from '@combase.app/ui/Text';

import { DashboardThemeIllustration, WidgetThemeIllustration } from './illustrations';

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

const ThemeSelector = ({ name, mode, onChange, value }) => {
	const Illustration = mode === 'dashboard' ? DashboardThemeIllustration : WidgetThemeIllustration;
	const systemDarkMode = useMedia(`(prefers-color-scheme: dark)`);

	const handleChange = useCallback((value) => {
		if (onChange) {
			onChange({
				target: {
					name,
					value,
				}
			})
		}
	}, [onChange, name]);

	return (
		<Root>
			<Button active={value === 'system'} type="button" interaction="bump" onClick={handleChange} value="system">
				<Illustration theme={systemDarkMode ? 'dark' : "light"} />
				<Text color={value === 'system' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>System (auto)</Text>
			</Button>
			<Button active={value === 'light'} type="button" interaction="bump" onClick={handleChange} value="light">
				<Illustration theme="light" />
				<Text color={value === 'light' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>Light</Text>
			</Button>
			<Button active={value === 'dark'} type="button" interaction="bump" onClick={handleChange} value="dark">
				<Illustration theme="dark" />
				<Text color={value === 'dark' ? 'primary' : 'text'} fontSize={3} lineHeight={4} fontWeight={500} marginTop={2}>Dark</Text>
			</Button>
		</Root>
	);
};

ThemeSelector.defaultProps = {
	mode: "dashboard"
}

export default ThemeSelector;
