import React from 'react';
import styled from 'styled-components';
import { layout } from '@combase.app/styles';
import { useContextSelector } from 'use-context-selector';

import {
	Avatar,
	AvatarGroup,
	Box,
	IconButton,
	CloseIcon,
	Heading,
	Text,
	TextGroup,
	Placeholder
} from '@combase.app/ui';

import { WidgetContext, useOrganization, useWidgetIsContained } from '../../../WidgetConfig';

const Root = styled(Box)`
    & ${TextGroup} {
        ${layout.maxWidth};
    }
`;

const Available = styled(Box)`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    user-select: none;
`;

const setOpenSelector = ({ toggleWidgetCard }) => toggleWidgetCard;
const Header = () => {
    const [organization] = useOrganization();
    const setOpen = useContextSelector(WidgetContext, setOpenSelector);

    const isContained = useWidgetIsContained();

    return (
        <Root padding={4}>
            <Avatar name={organization?.name} size={10} src={organization?.branding?.logo} />
            <TextGroup marginTop={2} gapTop={1} paddingTop={2} paddingBottom={4}>
                <Heading as={!organization ? Placeholder : undefined} placeholderWidth={13}>
                    {organization?.widget?.home?.title}
                </Heading>
                {organization ? (
                    <Text as={!organization ? Placeholder : undefined} fontSize={3} lineHeight={5} opacity={0.64}>
                        {organization?.widget?.home?.tagline}
                    </Text>
                ) : (
                    <TextGroup gapTop={1}>
                        <Text as={Placeholder} fontSize={3} lineHeight={4} placeholderWidth={12} />
                        <Text as={Placeholder} fontSize={3} lineHeight={4} placeholderWidth={10} />
                    </TextGroup>
                )}
            </TextGroup>
            <Available padding={4}>
                {!isContained ? <IconButton icon={CloseIcon} size={5} onClick={() => setOpen(false)} /> : null}
                <AvatarGroup>
                    {organization?.availableAgents?.slice?.(0, 5)?.map?.(({ _id, name }) => (
                        <Avatar key={_id} size={5} name={name.display} />
                    ))}
                </AvatarGroup>
                <Text variant="label" color="altText">
                    {organization?.availableAgents?.length || 0} available agents
                </Text>
            </Available>
        </Root>
    );
};

export default Header;
