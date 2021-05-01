import styled from 'styled-components';

import { Box } from '../../Layout';
import { Checkbox } from '../../Inputs';
import { Text } from '../../Text';

const Root = styled(Box)`
    display: grid;
    align-items: center;
    grid-template-columns: ${({ $columnTemplate, $selectable }) => ($selectable ? `max-content ${$columnTemplate}` : $columnTemplate)};
    grid-gap: ${({ theme }) => theme.space[2]};
    justify-content: space-between;
    user-select: none;
    z-index: 9;

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        & > ${Text} {
            user-select: none;
            cursor: pointer;
            font-variation-settings: 'wght' 600;
            color: ${({ theme }) => theme.colors.text};
        }
    }
`;

export const TableHeader = ({ checked, children, columnTemplate, indeterminate, onBulkSelect, selectable, ...rest }) => (
    <Root $columnTemplate={columnTemplate} $selectable={selectable} paddingX={3} paddingY={1} {...rest}>
        {selectable ? (
            <div>
                <Checkbox indeterminate={indeterminate} onChange={onBulkSelect} value={checked} />
            </div>
        ) : null}
        {children}
    </Root>
);
