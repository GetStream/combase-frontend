import styled from 'styled-components';
import { useSlate } from 'slate-react';

import Box from '../../Box';
import { Chip } from '../../Chip';
import { CloseCircleIcon, TagIcon } from '../../icons';
import { AuthorEntity } from '../../Lists';
import { Heading, Text } from '../../Text';
import { ChipInputBase, transformToTag } from '../../Inputs/shared';

const Root = styled(Box)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    & ${Heading} {
        outline: none;
    }
`;

const Meta = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Input = styled(ChipInputBase)`
    padding: 0 !important;

    &::placeholder {
        color: ${({ theme }) => theme.colors.altText};
    }
`;

const renderChip = ({ node = {} }, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
        backgroundColor="textA.8"
        color="text"
        icon={TagIcon}
        key={node?.name}
        label={node?.name}
        marginBottom={1}
        marginRight={1}
        marginTop={1}
        onActionClick={() => actions.removeAt(i)}
        selected={i === cursor}
    />
);

export const Title = ({ attributes, htmlAttributes, ...rest }) => {
    const { tags, onAddTag, onRemoveTag } = useSlate();

    return (
        <Root {...attributes} {...htmlAttributes} paddingY={4} marginY={8}>
            <Heading {...rest} contentEditable={true} />
            <Meta marginTop={6} contentEditable={false}>
                <Box contentEditable={false}>
                    <Text color="textA.56" fontSize={2} lineHeight={2} marginBottom={3}>
                        Author
                    </Text>
                    <AuthorEntity name="Luke" updatedAt="Just now" />
                </Box>
                <Box contentEditable={false}>
                    <Text contentEditable={false} color="textA.56" fontSize={2} lineHeight={2} marginBottom={3}>
                        Tags
                    </Text>
                    <Input
                        transformValue={transformToTag}
                        contentEditable={false}
                        placeholder="+ Add Tags"
                        renderChip={renderChip}
                        onAddChip={onAddTag}
                        onRemoveChip={onRemoveTag}
                        value={tags || []}
                    />
                </Box>
            </Meta>
        </Root>
    );
};
