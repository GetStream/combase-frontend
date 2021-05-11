import styled from 'styled-components';

import Card from '../../../../Card';
import IconLabel from '../../../../IconLabel';
import { Text } from '../../../../Text';
import { Spinner } from '../../../../Feedback';

const Root = styled(Card)`
    background-color: ${({ theme }) => theme.colors.textA[2]};
    cursor: pointer;
    & > ${Text} {
        pointer-events: none;
        users-select: none;
    }
`;

const EmptyElementBase = ({ icon, label, loading, onClick, type }) => (
    <Root contentEditable={false} padding={6} marginY={8} onClick={onClick}>
        {!loading ? (
            <IconLabel>
                {icon || null}
                <Text>{label || `Empty ${type}`}</Text>
            </IconLabel>
        ) : (
            <Spinner style={{ alignSelf: 'center' }} color="text" size={3} />
        )}
    </Root>
);

const EmptyElement = styled(EmptyElementBase, {}, undefined, {
    scope: 'EmptyElement',
})``;

export default EmptyElement;
