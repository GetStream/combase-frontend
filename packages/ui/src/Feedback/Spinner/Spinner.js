import { layout } from '@combase.app/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Root = styled.svg`
    ${layout};
    animation: rotate 1s linear infinite;

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    & circle:first-child {
        stroke: ${({ $color, theme }) => theme.colors[`${$color}A`][8]};
    }

    & circle:last-child {
        stroke: ${({ $color, theme }) => theme.colors[$color]};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

const Spinner = ({ color, size, className }) => (
    <Root $color={color} size={size} className={className} viewBox="0 0 24 24">
        <circle cx={12} cy={12} fill="none" r={12 - 5} strokeWidth="2" />
        <circle cx={12} cy={12} fill="none" r={12 - 5} strokeWidth="2" />
    </Root>
);

Spinner.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};

Spinner.defaultProps = {
    color: 'primary',
    size: 6,
};

export default Spinner;
