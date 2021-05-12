import styled from 'styled-components';
import { itemGap, layout, variant } from '@combase.app/styles';

import Box from '../Box';
import Text from '../Text';

const TextGroup = styled(Box)`
    ${layout};
    & > * + * {
        ${itemGap};
    }
    ${variant({
        variants: {
            centered: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                [`& > ${Text}`]: {
                    textAlign: 'center',
                },
            },
        },
    })}
`;

TextGroup.defaultProps = {
    gapTop: 1,
    variant: '',
};

export default TextGroup;