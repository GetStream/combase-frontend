import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { layout, themes } from '@combase.app/styles';
import { animated, to } from 'react-spring';

import Avatar from '@combase.app/ui/build/Avatar';
import Box from '@combase.app/ui/build/Box';
import Badge from '@combase.app/ui/build/Badge';
import Label from '@combase.app/ui/build/Label';
import Text from '@combase.app/ui/build/Text';
import TextGroup from '@combase.app/ui/build/TextGroup';
import Entity from '@combase.app/ui/build/Entity';
import {useScrollbars} from '@combase.app/ui/build/contexts/Scrollbars';

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
	
	const agentCount = organization?.availableAgents?.length || 0;
    
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
							<Badge color={agentCount ? "green" : "white"} />
							<Text>{agentCount} agent{agentCount === 1 ? '' : 's'} online</Text>
						</Label>
					</TextGroup>
				</Wrapper>
			</Root>
		</ThemeProvider>
    );
};

export default Header;
