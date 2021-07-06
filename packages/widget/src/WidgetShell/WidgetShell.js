import React, { Suspense, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { position, system } from '@combase.app/styles';
import { 
	Box,
	Card, 
	CloseIcon,
	IconButton,
	LoadingScreen, 
	Portal 
} from '@combase.app/ui';

import { PoweredBy } from './PoweredBy';
import { WidgetContext, useWidgetIsContained } from '../WidgetConfig/index';

const CloseWrapper = styled(Box)`
	position: absolute;
	top: ${({ theme }) => theme.space[5]};
	right: ${({ theme }) => theme.space[5]};
	z-index: 1;
`;

const widgetSpacingSystem = system({
    right: {
        property: 'bottom',
        scale: 'space',
        transform: (value, scale, { $fabSize, theme }) => {
            // Takes the `right` inset value, doubles it (the space above and below the fab,)
            // and then adds the fabSize - returning the `bottom` value.
            if (value > 0) {
                return `calc((${scale[value]} * 2) + ${theme.sizes[$fabSize]})`;
            }

            return scale[value];
        },
    },
});

const Root = styled(Card).attrs({
    as: animated.div,
    backgroundColor: 'background',
    borderRadius: ['unset', 'unset', 4],
})`
    ${position};
    ${widgetSpacingSystem};
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 999;
    display: grid;
    grid-template-rows: minmax(0, 1fr) ${({ theme }) => theme.space[7]};
	border: 2px solid ${({ theme }) => theme.colors.border};
	transform: translate3d(0px, 0px, 1px);

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        top: unset;
        left: unset;
        width: ${({ theme }) => theme.sizes[18]};
        max-height: ${({ theme }) => theme.sizes[20]};
        height: calc(100vh - (${({ $fabSize, theme: { sizes } }) => sizes[$fabSize]} * 2) - 4rem);
    }
`;

const shellRefSelector = ({ shellRef }) => shellRef;
const isOpenSelector = ({ open }) => open;
const setOpenSelector = ({ toggleWidgetCard }) => toggleWidgetCard;

export const WidgetShell = ({ fabSize, children }) => {
    const shellRef = useContextSelector(WidgetContext, shellRefSelector);
    const isOpen = useContextSelector(WidgetContext, isOpenSelector);
	const setOpen = useContextSelector(WidgetContext, setOpenSelector);
    const isContained = useWidgetIsContained();

    const transitionConfig = useMemo(
        () => ({
            config: {
                friction: isContained ? 80 : 40,
                mass: 1,
                tension: isContained ? 600 : 400,
            },
            enter: {
                [!isContained ? 'y' : 'x']: 0,
                opacity: 1,
            },
            from: {
                opacity: 0,
                [!isContained ? 'y' : 'x']: 100,
            },
            leave: {
                [!isContained ? 'y' : 'x']: 100,
                opacity: 0,
                config: {
                    friction: 40,
                    mass: 1,
                    tension: 600,
                },
            },
        }),
        [isContained]
    );

    const transition = useTransition(isOpen, transitionConfig);

    return transition((anim, show) => (
		<Portal unmount={!show}>
			<Root $fabSize={fabSize} boxShadow={['unset', 'unset', 9]} ref={shellRef} right={[0, 0, 7]} style={anim}>
				<CloseWrapper>
					<IconButton 
						icon={CloseIcon} 
						onClick={() => setOpen(false)} 
						variant="filled" 
					/>
				</CloseWrapper>
				<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
				<PoweredBy />
			</Root>
		</Portal>
	));
};
