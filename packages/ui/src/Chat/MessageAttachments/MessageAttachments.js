import React, { useCallback } from 'react';
import styled from 'styled-components';
import { borderRadius, layout } from '@combase.app/styles';
import { useChannel, useChannelActions } from '@combase.app/chat';

import Button from '../../Button';
import { CloseIcon, CommandIcon, RefreshIcon, SendIcon } from '../../icons';
import IconLabel from '../../IconLabel';
import Box from '../../Box';
import { Text } from '../../Text';

const Root = styled.div`
    ${'' /* max-width: min(80%, 22.5rem); */}
    max-width: 22.5rem;
    width: 100%;
`;

const Preview = styled.div`
    display: grid;
    grid-gap: 0.25rem;
    grid-template-columns: repeat(min(${({ attachmentCount }) => attachmentCount}, 2), 1fr);
`;

const MediaAttachment = styled.div`
    position: relative;
    overflow: hidden;
    z-index: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    ${borderRadius};
    ${layout.maxHeight}

    & > img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;

const GiphyAttachment = styled.div`
    display: grid;
    grid-template-rows: 1fr min-content;
`;

const GiphyActions = styled(Box).attrs({
    paddingY: 1,
})`
    display: grid;
    grid-template-columns: repeat(${({ $actionCount }) => $actionCount || 1}, 1fr);
    grid-gap: 0.25rem;
`;

// TODO: Improve this.
const giphyMap = {
    send: {
        icon: SendIcon,
        color: 'primary',
    },
    shuffle: {
        icon: RefreshIcon,
        color: 'yellow',
    },
    cancel: {
        icon: CloseIcon,
        color: 'red',
    },
};

export const MessageAttachments = ({ message }) => {
    const { attachments, id } = message;

    const channel = useChannel();
    const { removeMessage, updateMessage } = useChannelActions();

    const handleAction = useCallback(
        async (data, e) => {
            e.preventDefault();

            const response = await channel.sendAction(id, data);

            if (response?.message) {
                updateMessage(response.message);
            } else {
                removeMessage(message);
            }
        },
        [id]
    );

    return (
        <Root>
            <Preview attachmentCount={attachments.length} borderRadius={2} maxHeight={12}>
                {attachments.map(({ actions, fallback, image_url, thumb_url, type }) => {
                    switch (type) {
                        case 'giphy': {
                            return (
                                <GiphyAttachment>
                                    <MediaAttachment borderRadius={2}>
                                        <img alt={fallback} src={image_url || thumb_url} />
                                    </MediaAttachment>
                                    {actions?.length ? (
                                        <GiphyActions $actionCount={actions?.length}>
                                            {actions?.map(({ name, text, value }) => {
                                                const { color, icon: Icon } = giphyMap[value];
                                                return (
                                                    <Button
                                                        color={color}
                                                        size="xs"
                                                        key={value}
                                                        onClick={e => handleAction({ [name]: value }, e)}
                                                        variant="flat"
                                                    >
                                                        <IconLabel color="text">
                                                            <Icon />
                                                            <Text fontSize={2}>{text}</Text>
                                                        </IconLabel>
                                                    </Button>
                                                );
                                            }) || null}
                                        </GiphyActions>
                                    ) : null}
                                </GiphyAttachment>
                            );
                        }
                        default: {
                            return (
                                <MediaAttachment key={image_url || thumb_url}>
                                    {type === 'image' ? (
                                        <img alt={fallback} src={image_url || thumb_url} />
                                    ) : (
                                        <img alt={fallback} src={thumb_url} />
                                    )}
                                    {actions?.length ? actions.map(() => <IconButton icon={CommandIcon} />) : null}
                                </MediaAttachment>
                            );
                        }
                    }
                })}
            </Preview>
        </Root>
    );
};
