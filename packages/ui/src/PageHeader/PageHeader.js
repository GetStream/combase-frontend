import React, { forwardRef, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';
import { useQuery, GET_CURRENT_USER } from '@combase.app/apollo';
import { useHistory } from 'react-router-dom';

import { useScrollbars } from '../contexts';
import { IconButton } from '../Buttons';
import { ArrowBackIcon, MenuIcon } from '../icons';
import Box from '../Box';
import Container from '../Container';
import HeaderBase from '../HeaderBase';
import PageTitle from '../PageTitle';

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    svg + div {
        margin-left: 1rem;
    }
`;

const DummyIcon = styled(Box)`
    ${layout};
`;

const Wrapper = styled(Container).attrs({
    as: animated.div,
})`
    ${layout};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: default;
`;

const PageHeader = forwardRef(
    (
        {
            actions,
            animated,
            backgroundColor,
            centered,
            children,
            className,
            goBack,
            fluid,
            hideTitle,
            hideLeftAction,
            leftIcon,
            pageTitleStyle,
            reverse,
            onTitleClick,
            showOrganization,
            subtitle,
            title,
        },
        ref
    ) => {
        const { data } = useQuery(GET_CURRENT_USER);
        const history = useHistory();
        const theme = useTheme();
        const scrollbars = useScrollbars();

        const centerTitle = !data?.isSmViewport && centered;

        const style = useMemo(
            () =>
                Boolean(scrollbars?.anim) && animated
                    ? {
                          height: scrollbars?.anim.value.to({
                              output: [theme.sizes[10], theme.sizes[9]],
                              range: [0, scrollbars?.threshold],
                              extrapolate: 'clamp',
                          }),
                      }
                    : null,
            [animated, scrollbars, theme]
        );

        return (
            <HeaderBase
                animated={animated}
                backgroundColor={backgroundColor}
                className={className}
                fluid={fluid}
                ref={ref}
                maxWidth={fluid ? undefined : 19}
            >
                <Wrapper variant="fluid" minHeight={11} style={style}>
                    <Title>
                        {!hideLeftAction
                            ? leftIcon || (
                                  <IconButton
                                      marginRight={!centerTitle ? 3 : 0}
                                      icon={goBack ? ArrowBackIcon : MenuIcon}
                                      onClick={goBack ? history.goBack : undefined}
                                      size={5}
                                  />
                              )
                            : null}
                        {!hideTitle && !centerTitle ? (
                            <PageTitle
                                centered={centered}
                                reverse={reverse}
                                subtitle={showOrganization ? data?.organization?.name : subtitle || ''}
                                title={title}
                                onClick={onTitleClick}
                                style={pageTitleStyle}
                            />
                        ) : null}
                    </Title>
                    {!hideTitle && centerTitle ? (
                        <PageTitle
                            centered={centered}
                            reverse
                            subtitle={showOrganization ? data?.organization?.name : subtitle}
                            title={title}
                            onClick={onTitleClick}
                        />
                    ) : null}
                    {actions || <DummyIcon size={4} />}
                </Wrapper>
                {children}
            </HeaderBase>
        );
    }
);

PageHeader.defaultProps = {
    animated: true,
    fluid: true,
    hideLeftAction: true,
	hideTitle: false,
};

export default PageHeader;
