import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { gql, useMutation, useQuery, GET_ORGANIZATION_PROFILE } from '@combase.app/apollo';

import { Box, Container, LabelledCheckbox, ListDetailSection, Text, TextInput } from '@combase.app/ui';

const InputGroup = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    grid-column-gap: ${({ theme }) => theme.space[5]};
    grid-row-gap: ${({ theme }) => theme.space[5]};

    & > div:nth-child(n + 3) {
        grid-row: 2;
    }
`;

const ManageUsers = () => {
    const { data } = useQuery(GET_ORGANIZATION_PROFILE);

    return (
        <Container variant="fluid">
            <Text>Testing</Text>
        </Container>
    );
};

export default ManageUsers;
