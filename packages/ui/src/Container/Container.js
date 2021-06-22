import styled from 'styled-components';
import PropTypes from 'prop-types';
import { grid, layout, variant } from '@combase.app/styles';

import Box from '../Box';

const Container = styled(Box).attrs(props => ({
    paddingX: props.gutter ? props.paddingX : 0,
    marginX: props.centered ? 'auto' : undefined,
}))`
    ${grid};
    ${layout.maxWidth};
    width: 100%;
    ${props =>
        variant({
            variants: {
                fluid: {
                    maxWidth: '100%',
                },
                contained: {
                    maxWidth: props.maxWidth || 23,
                },
            },
        })}
`;

Container.propTypes = {
    gutter: PropTypes.bool,
    variant: PropTypes.oneOf(['contained', 'fluid']),
};

Container.defaultProps = {
    centered: true,
    gutter: true,
    paddingX: [3, 4, 5],
    variant: 'contained',
};

export default Container;