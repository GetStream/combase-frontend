import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { fill, themes } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';

const SvgEl = styled.svg`
	${fill};
`;

const WidgetThemeIllustration = ({ theme }) => (
	<ThemeProvider theme={themes[theme]}>
		<Box borderRadius={2} as="svg" viewBox="0 0 160 112" overflow="hidden">
			<SvgEl as="rect" width="160" height="112" rx="8" fill="border"/>
			<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="112">
				<rect width="160" height="112" rx="8" fill="white"/>
			</mask>
			<g mask="url(#mask0)">
				<SvgEl as="path" d="M36 29C36 22.3726 41.3726 17 48 17H160V112H36V29Z" fill="surface"/>
				<SvgEl as="path" d="M36 29C36 22.3726 41.3726 17 48 17H160V112H36V29Z" fill="primary"/>
				<SvgEl as="path" d="M45 81C45 74.3726 50.3726 69 57 69H176V123H45V81Z" fill="surface"/>
				<SvgEl as="circle" cx="60" cy="41" r="12" fill="surface"/>
				<SvgEl as="circle" cx="65" cy="89" r="8" fill="primary"/>
				<SvgEl as="rect" x="81" y="85" width="85" height="9" rx="4.5" fill="text"/>
				<SvgEl as="rect" x="81" y="37" width="85" height="9" rx="4.5" fill="surface"/>
			</g>
		</Box>
	</ThemeProvider>
)

WidgetThemeIllustration.defaultProps = {
	theme: 'light'
}

export default WidgetThemeIllustration;