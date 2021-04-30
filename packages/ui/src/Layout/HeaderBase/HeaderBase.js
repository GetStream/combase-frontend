import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { layout, variant } from '@combase.app/styles';

import { useScrollbars } from '../../contexts';
import Container from '../Container';

const Root = styled(Container).attrs(props => ({
    as: animated.div,
    borderBottomLeftRadius: props.fluid ? [2, 2, 'unset'] : 2,
    borderBottomRightRadius: props.fluid ? [2, 2, 'unset'] : 2,
    gutters: false,
    zIndex: 1,
    variant: props.fluid ? 'fluid' : undefined,
}))`
    ${layout};
    position: sticky;
    top: 0;

    ${variant({
        variants: {
            raised: {
                boxShadow: ({ colors, utils }) => `0px 2px 16px -6px ${utils.colors.fade(colors.shadow, 0.16)}`,
                height: ({ sizes }) => sizes[8],
            },
            flat: {
                borderBottomLeftRadius: 'unset',
                borderBottomRightRadius: 'unset',
                height: ({ sizes }) => sizes[10],
            },
        },
    })}
`;

const HeaderBase = ({ animated, backgroundColor, border, children, className, fluid, maxWidth, variant }) => {
    const scrollbars = useScrollbars();
    const theme = useTheme();

    const style = useMemo(
        () =>
            Boolean(scrollbars?.anim) && animated
                ? {
                      backgroundColor: scrollbars?.anim.value.to({
                          output: [theme.colors[backgroundColor || 'background'], theme.colors.surface],
                          range: [0, scrollbars?.threshold],
                          extrapolate: 'clamp',
                      }),
                      boxShadow: scrollbars?.anim.value.to({
                          output: [`0px 1px 0px 0px rgba(0, 0, 0, ${border ? '0.05' : '0'})`, `0px 4px 20px -16px rgba(0, 0, 0, 0.16)`],
                          range: [0, scrollbars?.threshold],
                          extrapolate: 'clamp',
                      }),
                  }
                : null,
        [animated, backgroundColor, scrollbars, theme]
    );

    return (
        <Root maxWidth={maxWidth} fluid={fluid} variant={!scrollbars ? variant : undefined} gutter={false} className={className} style={style}>
            {children}
        </Root>
    );
};

HeaderBase.propTypes = {
    animated: PropTypes.bool,
    variant: PropTypes.oneOf(['flat', 'raised']),
};

HeaderBase.defaultProps = {
    animated: true,
    variant: 'flat',
};

export default HeaderBase;