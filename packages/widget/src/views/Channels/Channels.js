import { useChannelManager } from '@combase.app/chat';
import { useToggle } from 'react-use';
import {
	Box,
	Checkbox,
	CloseIcon,
	EditIcon,
	EmptyView,
	InboxIcon,
	ScrollbarsWithContext,
	Text,
	useBulkSelect,
} from '@combase.app/ui';

import { WidgetHeader } from '../../WidgetHeader';
import { WidgetChannelPreview } from '../../WidgetChannelPreview';

const getSelectionValue = channel => channel.id;
const ChannelsScreen = () => {
    const { channels } = useChannelManager();
    const [editMode, toggleEditMode] = useToggle();
    const [selectableListItemProps, bulkCheckboxProps, selected] = useBulkSelect(channels, getSelectionValue);

    return (
        <ScrollbarsWithContext type="px">
            <WidgetHeader
                icon={editMode ? <Checkbox {...bulkCheckboxProps} size={4} /> : undefined}
                onBackClick={history.goBack}
                action={
                    <IconButton
                        color={!editMode ? 'altText' : 'error'}
                        icon={!editMode ? EditIcon : CloseIcon}
                        onClick={toggleEditMode}
                        size={4}
                    />
                }
                title="Conversations"
                subtitle={`${channels?.length || 0} total${editMode ? ` • ${selected?.length || 0} selected` : ''}`}
            />
            <Box paddingX={[1, 1, 2]} paddingTop={2} paddingBottom={4}>
                {channels?.length ? (
                    channels.map(channel => (
                        <WidgetChannelPreview {...selectableListItemProps} selectable={editMode} channel={channel} key={channel.cid} />
                    ))
                ) : (
                    <EmptyView
                        color="altTextA.56"
                        icon={<InboxIcon color="altTextA.56" size={10} />}
                        minHeight={12}
                        title="No Recent Conversations"
                    >
                        <Text color="altTextA.56" fontSize={2} lineHeight={4} marginTop={1}>
                            Got a question? <br /> Start a new conversation! 💬
                        </Text>
                    </EmptyView>
                )}
            </Box>
        </ScrollbarsWithContext>
    );
};

export default ChannelsScreen;
