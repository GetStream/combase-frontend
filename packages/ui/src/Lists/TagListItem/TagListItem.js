import { memo } from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import { IconLabel } from '../../IconLabel';
import { TagIcon } from '../../icons';
import { Box } from '../../Layout';
import { Text } from '../../Text';

import { Entity } from '../Entity';
import { ListItem } from '../ListItem';

const Stats = styled(Box)`
    display: flex;
    align-items: center;

    & > * + * {
        ${itemGap};
    }
`;

export const TagListItem = memo(({ amount, name, ...rest }) => (
    <ListItem {...rest}>
        <Entity>
            <IconLabel size={4}>
                <TagIcon color="yellow" />
                <Text color="text" fontSize={3} lineHeight={2}>
                    {name}
                </Text>
            </IconLabel>
            {/* <Stats gapLeft={2}>
				<IconLabel color="altText" size={1}>
					<ConversationsIcon />
					<Text fontSize={2} lineHeight={2}>
						{10}
					</Text>
				</IconLabel>
				<IconLabel color="altText" size={1}>
					<KnowledgeBaseIcon />
					<Text fontSize={2} lineHeight={2}>
						{3}
					</Text>
				</IconLabel>
			</Stats> */}
        </Entity>
    </ListItem>
));
