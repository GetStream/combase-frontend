import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import Box from '../Box';
import ButtonBase from '../ButtonBase';
// import {Checkbox} from '../Inputs/Checkbox';

const Root = styled(ButtonBase)`
	width: 100%;
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

// const CheckboxInput = styled(Checkbox)`
//     align-self: ${({ $alignCheckbox }) => $alignCheckbox};
// `;

const ListItem = ({ active, alignCheckbox, buttonRef, columnTemplate, children, interaction, onClick, onSelect, selectable, value, ...rest }) => {
    const isSelected = rest?.isSelected?.(value);

    return (
        <Root {...rest} ref={buttonRef} onClick={onClick} padding={1} type="button">
            <Wrapper
                active={active}
                $columnTemplate={columnTemplate}
                $selectable={selectable}
                borderRadius={3}
                color="text"
                interaction={interaction}
                paddingX={selectable ? 2 : 3}
                paddingY={4}
            >
                {/* {selectable ? (
                    <CheckboxInput
                        $alignCheckbox={alignCheckbox}
                        onChange={() => onSelect?.(value)}
                        value={isSelected}
						size={4}
                    />
                ) : null} */}
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

export default ListItem;
