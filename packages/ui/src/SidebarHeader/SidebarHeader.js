import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';
import { useHistory } from 'react-router-dom';

import { IconButton } from '../Buttons';
import { ArrowBackIcon, MenuIcon } from '../icons';
import Box from '../Box';
import Container from '../Container';
import HeaderBase from '../HeaderBase';

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

const PageHeader = forwardRef(({ actions, animated, backgroundColor, children, className, goBack, gutter, fluid }, ref) => {
    const history = useHistory();

    return (
        <HeaderBase
            animated={animated}
            backgroundColor={backgroundColor}
            className={className}
            fluid={fluid}
            ref={ref}
            maxWidth={fluid ? undefined : 19}
        >
            <Wrapper gutter={gutter} variant="fluid" minHeight={10}>
                <Title>
                    <IconButton
                        marginRight={4}
                        icon={goBack ? ArrowBackIcon : MenuIcon}
                        onClick={goBack ? history.goBack : undefined}
                        size={4}
                    />
                </Title>
                {actions || <DummyIcon size={4} />}
            </Wrapper>
            {children}
        </HeaderBase>
    );
});

PageHeader.defaultProps = {
    animated: true,
    fluid: true,
    hideLeftAction: true,
};

export default PageHeader;
