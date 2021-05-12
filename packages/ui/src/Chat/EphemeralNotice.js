import Box from '../Box';
import { InfoIcon } from '../icons';
import IconLabel from '../IconLabel';
import Text from '../Text';

export const EphemeralNotice = () => (
    <Box paddingY={1}>
        <IconLabel fontFamily="title" reverse size={2}>
            <InfoIcon color="altText" />
            <Text color="altText" variant="label">{`Only you can see this`}</Text>
        </IconLabel>
    </Box>
);
