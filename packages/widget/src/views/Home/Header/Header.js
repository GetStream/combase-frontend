import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { layout, themes } from '@combase.app/styles';
import { animated, to } from 'react-spring';

import {
	Avatar,
	Badge,
	Box,
	Label,
	Text,
	TextGroup,
	Entity,
	useScrollbars,
} from '@combase.app/ui';

import { useOrganization, useAuth } from '../../../WidgetConfig';

import WelcomeMessage from './WelcomeMessage';

const Root = styled(Box)`
    & ${TextGroup} {
        ${layout.maxWidth};
    }
`;

const Wrapper = styled(Box).attrs({
	as: animated.div
})``;

const Brand = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Header = () => {
    const [organization] = useOrganization();
	const [auth] = useAuth();
	const scrollbars = useScrollbars();

	const styles = useMemo(() => scrollbars ? ({
		wrapper: {
			opacity: scrollbars.anim.value.to({
				output: [1, 0],
				range: [0, 120],
			}),
			transform: to([
				scrollbars.anim.value.to({
					output: [0, -24],
					range: [0, 120],
					extrapolate: 'clamp',
				}),
				scrollbars.anim.value.to({
					output: [1, 0.95],
					range: [0, 120],
					extrapolate: 'clamp',
				})
			], (y, scale) => `translate3d(0px, ${y}px, 0px) scale(${scale})`),
		}
	}) : ({}), [scrollbars]);

    return (
        <ThemeProvider theme={themes.dark}>
			<Root backgroundColor="primary" borderBottomLeftRadius={3} borderBottomRightRadius={3} minHeight={16}>
				<Wrapper style={styles.wrapper} padding={7}>
					<Brand>
						<Entity icon={<Avatar name={organization?.name} size={10} src={organization?.branding?.logo} />}>
							<TextGroup gapTop={0}>
								<Text  fontSize={6} lineHeight={6} fontWeight="600">Stream</Text>
								<Text  opacity={.56}>Boulder, CO • Amsterdam, NL</Text>
							</TextGroup>
						</Entity>
					</Brand>
					<TextGroup gapTop={0} marginY={2} >
						<Text fontSize={6} lineHeight={9}>
							<WelcomeMessage />
						</Text>
						<Label color="altText" gap={2} variant="ghost">
							<Badge color="green" />
							<Text>{organization?.availableAgents?.length || 0} agents online</Text>
						</Label>
					</TextGroup>
				</Wrapper>
			</Root>
		</ThemeProvider>
    );
};

export default Header;
