import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { fill, themes } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';

const SvgEl = styled.svg`
	${fill};
`;

const DashboardThemeIllustration = ({ theme }) => (
	<ThemeProvider theme={themes[theme]}>
		<Box borderRadius={2} as="svg" viewBox="0 0 160 112" overflow="hidden">
			<SvgEl as="rect" width="160" height="112" fill={theme === 'dark' ? "background" : "border"} />
			<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="112">
				<rect width="160" height="112" rx="8" fill="white"/>
			</mask>
			<g mask="url(#mask0)">
				<SvgEl as="path" d="M36 29C36 22.3726 41.3726 17 48 17H160V112H36V29Z" fill="surface" />
				<SvgEl as="circle" cx="60" cy="41" r="12" fill="border" />
				<SvgEl as="circle" cx="59" cy="81" r="8" fill="altText" fillOpacity="0.56" />
				<SvgEl as="circle" cx="104" cy="41" r="8" fill="primary" />
				<SvgEl as="rect" x="53" y="93" width="12" height="2" rx="1" fill="text" fillOpacity="0.56" />
				<SvgEl as="rect" x="120" y="37" width="49" height="8" rx="4" fill="text"/>
				<SvgEl as="rect" x="96" y="73" width="80" height="24" rx="4" fill="text" fillOpacity="0.04"/>
				<SvgEl as="rect" x="120" y="82" width="54" height="6" rx="3" fill="text" fillOpacity="0.08"/>
				<SvgEl as="circle" cx="108" cy="85" r="5" fill="text" fillOpacity="0.12"/>
			</g>
		</Box>
	</ThemeProvider>
)

DashboardThemeIllustration.defaultProps = {
	theme: 'light'
}

export default DashboardThemeIllustration;