import styled from 'styled-components';
import Text from './Text';

export const Code = styled(Text).attrs({
    as: 'code',
    fontFamily: 'code',
})`
    display: inline-flex;
    border-radius: ${({ theme }) => theme.radii[0]};
    background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.text, 0.05)};
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

Code.defaultProps = {
    fontSize: 2,
    paddingX: 1,
    paddingY: 'small',
    color: 'primary',
};
