import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useMedia } from 'react-use';

import { Box } from '../../Layout';
import { Card } from '../../Cards';

const SplitRoot = styled(Card).attrs({
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
})`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: ${({ $columnTemplate }) => $columnTemplate};
    grid-auto-rows: 100%;
	box-shadow: -4px 0px 24px -8px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, .4)};
`;

const Primary = styled(Box)`
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    z-index: 5;
`;

const Secondary = styled(Box)`
    background-color: ${({ theme }) => theme.colors.background};
    overflow: hidden;
    z-index: 4;
`;

export const SplitView = ({ children, columnTemplate, ...rest }) => {
    const theme = useTheme();
    const sideBySide = useMedia(`(min-width: ${theme.breakpoints[1]})`);

    if (sideBySide) {
        return (
            <SplitRoot $columnTemplate={columnTemplate} {...rest}>
                {children?.length
                    ? Children.map(children, (child, index) => {
                          if (index === 0) {
                              return <Primary key={child.props.path}>{child}</Primary>;
                          }

                          if (index === 1) {
                              return <Secondary key={child.props.path}>{child}</Secondary>;
                          }

                          return null;
                      })
                    : null}
            </SplitRoot>
        );
    }

    return (
        <Switch>
            {Children.map(children, child => (
                <Route exact={child.props.exact} path={child.props.path} children={props => cloneElement(child, props)} />
            ))}
        </Switch>
    );
};

SplitView.propTypes = {
    columnTemplate: PropTypes.string,
};

SplitView.defaultProps = {
    columnTemplate: '3fr 2fr',
};
