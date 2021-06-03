import React from 'react';
import styled from 'styled-components';
import { borderRadius, layout, space, typography } from '@combase.app/styles';
import { ChatAutoComplete } from 'stream-chat-react';

import IconButton from '../../IconButton';
import Box from '../../Box';
import Container from '../../Container';
import { AttachmentIcon, ArrowUpCircleIcon } from '../../icons';

const Root = styled(Container)`
    box-shadow: 0px -2px 16px -6px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, 0.16)};
`;

const Wrapper = styled(Container)`
    ${layout.minHeight};
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ActionButton = styled(Box)`
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
`;

const Input = styled(Box)`
    ${borderRadius};
    ${layout};
    ${typography};
    ${space};
    height: 100%;
    flex: 1 1 auto;
    resize: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.text};
    z-index: 1;
    color: ${({ theme }) => theme.colors.text};

    background-color: ${({ $hasValue, color, theme }) => theme.utils.colors.fade(theme.colors[color], $hasValue ? 0.04 : 0.02)};

	& textarea {
		padding: ${({ theme }) => theme.space[3]};
		background: transparent;
		width: 100%;
		resize: none;
		color: ${({ theme }) => theme.colors.text};
		font-family: ${({ theme }) => theme.fonts.text};
		font-size: ${({ theme }) => theme.fontSizes[3]};
		line-height: ${({ theme }) => theme.fontSizes[5]};
	}

    &:hover,
    &:focus-within {
        background-color: ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.04)};
    }
`;

export const MessageInputSimple = props => {
	const disabled = false;
    return (
        <Root backgroundColor="surface" borderTopLeftRadius={2} borderTopRightRadius={2} gutter={false} paddingY={1}>
            <Wrapper minHeight={7} paddingTop={3} paddingBottom={1}>
                <ActionButton marginRight={[1, 1, 2]} paddingBottom={1}>
                    <IconButton icon={AttachmentIcon} size={[5, 5, 6]} />
                </ActionButton>
                <Input fontFamily="text" marginX={2} borderRadius={2}>
					<ChatAutoComplete />
                </Input>
                <ActionButton marginLeft={[1, 1, 2]} paddingBottom={1}>
                    <IconButton
                        color="primary"
                        disabled={disabled}
                        icon={ArrowUpCircleIcon}
                        size={[5, 5, 6]}
                    />
                </ActionButton>
            </Wrapper>
        </Root>
    );
};

MessageInputSimple.defaultProps = {
    disabled: false,
    focus: false,
    maxRows: 10,
};
