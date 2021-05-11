import AvatarGroup from '.';
import Avatar from '../Avatar';

export default {
    component: AvatarGroup,
    title: 'shared/AvatarGroup',
};

export const Default = () => (
    <AvatarGroup bgColor="background" size={7}>
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
    </AvatarGroup>
);
