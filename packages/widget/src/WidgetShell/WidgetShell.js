import React, { Suspense, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import { position, system } from '@combase.app/styles';
import { Card, LoadingScreen, Portal } from '@combase.app/ui';
import { animated } from 'react-spring';

import { PoweredBy } from './PoweredBy';
import { WidgetContext, useWidgetIsContained } from '../WidgetConfig/index';

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
    ${widgetSpacingSystem}
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 999;
    display: grid;
    grid-template-rows: minmax(0, 1fr) ${({ theme }) => theme.space[7]};

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        top: unset;
        left: unset;
        width: ${({ theme }) => theme.sizes[17]};
        max-height: ${({ theme }) => theme.sizes[19]};
        height: calc(100vh - (${({ $fabSize, theme: { sizes } }) => sizes[$fabSize]} * 2) - 4rem);
    }
`;

const shellRefSelector = ({ shellRef }) => shellRef;
const isOpenSelector = ({ open }) => open;

export const WidgetShell = ({ fabSize, children }) => {
    const shellRef = useContextSelector(WidgetContext, shellRefSelector);
    const isOpen = useContextSelector(WidgetContext, isOpenSelector);

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
				<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
				<PoweredBy />
			</Root>
		</Portal>
	));
};
