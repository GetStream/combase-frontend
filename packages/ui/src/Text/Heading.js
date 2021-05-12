import styled from 'styled-components';

import Text from './Text';

export const Heading = styled(Text)``;

Heading.defaultProps = {
    as: 'h3',
    color: 'text',
    fontFamily: 'title',
    fontSize: [5, 7],
    fontWeight: 600,
    lineHeight: [6, 8],
};
