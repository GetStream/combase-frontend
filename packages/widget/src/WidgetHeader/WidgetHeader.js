import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';

import {
	Container,
	HeaderBase,
	IconButton,
	ArrowBackIcon,
	Entity,
	Placeholder,
	Text,
	useScrollbars,
} from '@combase.app/ui';

const Root = styled(HeaderBase)`
    ${layout.minHeight};
`;

const Wrapper = styled(Container).attrs({
    as: animated.div,
})`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const WidgetHeader = ({ action, icon, subtitle, title }) => {
    const theme = useTheme();
    const history = useHistory();
    const scrollbars = useScrollbars();

    const style = useMemo(
        () =>
            Boolean(scrollbars?.anim) && animated
                ? {
                      height: scrollbars?.anim.value.to({
                          output: [theme.sizes[10], theme.sizes[8]],
                          range: [0, scrollbars?.threshold],
                          extrapolate: 'clamp',
                      }),
                  }
                : null,
        [animated, scrollbars, theme]
    );

    return (
        <Root minHeight={8}>
            <Wrapper style={style}>
                <Entity icon={icon || <IconButton icon={ArrowBackIcon} onClick={history.goBack} size={4} />} marginLeft={3} gapTop={1}>
                    <Text as={!title ? Placeholder : undefined} fontSize={4} fontWeight="600" lineHeight={4}>
                        {title}
                    </Text>
                    <Text as={!subtitle ? Placeholder : undefined} fontSize={2} lineHeight={2} color="altText">
                        {subtitle}
                    </Text>
                </Entity>
                {action || null}
            </Wrapper>
        </Root>
    );
};
