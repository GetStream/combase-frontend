import React from 'react';
import styled from 'styled-components';
import { layout } from '@combase.app/styles';

import Box from '../Box';
import IconButton from '../IconButton';
import IconBubble from '../IconBubble';
import IconLabel from '../IconLabel';
import Text from '../Text';
import { CheckCircleIcon, CloseCircleIcon, CloseIcon, InfoIcon, WarningIcon } from '../icons';

const Root = styled(Box)`
	display: flex;
	align-self: flex-end;
	align-items: center;
	justify-content: space-between;
	transition: 240ms all ${({ theme }) => theme.easing.snapPing};
	box-shadow: 0px 4px 8px -2px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, 0.2)};
	${layout};

	& + & {
		margin-top: ${({ theme }) => theme.space[2]};
	}
`;

const iconMap = {
	success: CheckCircleIcon,
	error: CloseCircleIcon,
	warning: WarningIcon,
	info: InfoIcon,
}

function getTranslate(placement) {
    const pos = placement.split('-');
    const relevantPlacement = pos[1] === 'center' ? pos[0] : pos[1];
    const translateMap = {
        right: 'translate3d(120%, 0, 0)',
        left: 'translate3d(-120%, 0, 0)',
        bottom: 'translate3d(0, 120%, 0)',
        top: 'translate3d(0, -120%, 0)',
    };

    return translateMap[relevantPlacement];
}

const animStates = (placement) => ({
    entering: { transform: getTranslate(placement) },
    entered: { transform: 'translate3d(0,0,0)' },
    exiting: { transform: 'scale(0.8)', opacity: 0 },
    exited: { transform: 'scale(0.8)', opacity: 0 },
});


const Snackbar = ({ appearance, children, onDismiss, placement, transitionState }) => {
	const Icon = iconMap[appearance];
	return (
		<Root backgroundColor="surface" boxShadow={2} width={17} style={animStates(placement)[transitionState]} padding={4} paddingRight={6} borderRadius={2}>
			<IconLabel marginRight={8} gap={2}>
				{/* <Icon size={5} color="text" /> */}
				<IconBubble color={appearance} icon={Icon} />
				<Text fontSize={3} lineHeight={5}>{children}</Text>
			</IconLabel>
			<IconButton icon={CloseIcon} onClick={onDismiss} size={3} />
		</Root>
	);
};

export default Snackbar;