import { Avatar, AvatarGroup } from '.';

export default {
    component: Avatar,
    title: 'shared/Avatar',
};

export const Initial = () => <Avatar name="Luke" />;
export const Image = () => <Avatar name="Luke" src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />;
export const Group = () => (
    <AvatarGroup bgColor="surface" size={7}>
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
        <Avatar name="Luke" size={7} src="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" />
    </AvatarGroup>
);
export const Placeholder = () => <Avatar />;
