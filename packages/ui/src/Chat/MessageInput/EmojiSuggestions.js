import React from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';

import IconButton from '../../IconButton';
import { Helper } from '../../Inputs/shared/Helper';
import { ListSubheader } from '../../Lists';

const Root = styled.div`
    padding-top: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled(ListSubheader)`
    color: ${({ theme }) => theme.colors.altText};
    font-size: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const Emojis = styled.div`
    display: flex;
    position: relative;
    height: 2.5rem;
`;

const Scroll = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 1rem;
    overflow-x: auto;
    overflow-y: visible;
    display: flex;
    flex-direction: row;
    align-items: center;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const EmojiBtn = styled(IconButton)`
    display: inline-flex;
    flex-shrink: 0;
    ${'' /* float: left; */}

    & + & {
        margin-left: 0.5rem;
    }

    &:last-child {
        margin-right: 1rem;
    }

    span {
        font-size: ${({ $size }) => $size - 0.25}rem;
    }
`;

const EmojiSuggestions = ({ options: emojis, onSelectItem }) => {
    const editor = useSlate();
    return (
        <Root>
            <Title>{'Emoji Suggestions'}</Title>
            <Emojis>
                <Scroll>
                    {emojis?.map(({ id, native }, index) => {
                        const Emoji = props => (
                            <span {...props} role="img">
                                {native}
                            </span>
                        );

                        return (
                            <EmojiBtn $size={1.5} icon={Emoji} key={id} onClick={() => onSelectItem(editor, native)} tabindex={`${index}`} />
                        );
                    }) || <Helper text="No Suggestions" />}
                </Scroll>
            </Emojis>
        </Root>
    );
};

export default EmojiSuggestions;
