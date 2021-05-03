import { DoneAllIcon, DoneIcon } from '../icons';

export const DeliveryStatus = ({ sending, read, ...rest }) => (!sending ? <DoneAllIcon {...rest} color={read ? "primary" : 'altText'} size={1} /> : <DoneIcon {...rest} color={'altText'} size={1} />);