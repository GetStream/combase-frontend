import styled from 'styled-components';
import { useEditor, useReadOnly } from 'slate-react';

import Box from '../../../Box';
import Text from '../../../Text';
import { Checkbox } from '../../Checkbox';

const Root = styled(Box)`
    display: flex;
    flex-direction: row;
`;

const CheckboxWrapper = styled(Box).attrs({
    marginRight: 2,
})`
    user-select: none;
    display: flex;
    align-items: center;
`;

const Label = styled(Text)`
    flex: 1;
    text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
`;

const TodoListItem = ({ attributes, children, element, className, htmlAttributes }) => {
    const editor = useEditor();
    const readOnly = useReadOnly();

    const { checked } = element;

    return (
        <Root {...attributes} {...htmlAttributes}>
            <CheckboxWrapper contentEditable={false}>
                <Checkbox
                    data-testid="TodoListElementCheckbox"
                    value={!!checked}
                    size={5}
                    onChange={e => {
                        editor.setNodeById(element.id, { checked: e.target.checked });
                    }}
                />
            </CheckboxWrapper>
            <Label
                $checked={checked}
                contentEditable={!readOnly}
                suppressContentEditableWarning
                marginY={1}
                fontSize={4}
                lineHeight={6}
                opacity={checked ? 0.64 : 1}
            >
                {children}
            </Label>
        </Root>
    );
};

export default TodoListItem;