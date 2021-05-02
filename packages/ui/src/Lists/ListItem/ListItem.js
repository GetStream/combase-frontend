import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import { Box } from '../../Layout';
import { Checkbox } from '../../Inputs';

const Root = styled(Box)`
    padding: 0.125rem 0;
`;

const Wrapper = styled(Box)`
    ${interactions};

    display: grid;
    align-items: center;
    grid-template-columns: ${({ $columnTemplate, $selectable }) => ($selectable ? `max-content ${$columnTemplate}` : $columnTemplate)};
    grid-gap: ${({ theme }) => theme.space[2]};
    justify-content: space-between;
    user-select: none;
`;

const CheckboxInput = styled(Checkbox)`
    align-self: ${({ $alignCheckbox }) => $alignCheckbox};
`;

export const ListItem = ({ active, alignCheckbox, columnTemplate, children, interaction, onClick, onSelect, selectable, value, ...rest }) => {
    const isSelected = rest?.isSelected?.(value);

    const handleClick = e => {
        if (!e.nativeEvent.defaultPrevented && onClick) {
            onClick(e);
        }
    };

    return (
        <Root {...rest} onClick={handleClick}>
            <Wrapper
                active={active}
                $columnTemplate={columnTemplate}
                $selectable={selectable}
                borderRadius={3}
                color="text"
                interaction={interaction}
                paddingX={selectable ? 2 : 3}
                paddingY={3}
            >
                {selectable ? (
                    <CheckboxInput
                        $alignCheckbox={alignCheckbox}
                        onChange={e => {
                            onSelect?.(value);
                        }}
                        value={isSelected}
                    />
                ) : null}
                {children || null}
            </Wrapper>
        </Root>
    );
};

ListItem.propTypes = {
    alignCheckbox: PropTypes.oneOf(['flex-start', 'center']),
    columnTemplate: PropTypes.string,
    interaction: PropTypes.oneOf(['highlight', 'hover']),
};

ListItem.defaultProps = {
    alignCheckbox: 'flex-start',
    columnTemplate: '1fr',
    interaction: 'hover',
};
