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

const WidgetSettings = () => {
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);

	return (
		<Container variant="fluid">
			<ListDetailSection
				title="Welcome Message"
				description="Edit the series of message(s) that a end-user will receive upon starting a new conversation."
			/>
			<ListDetailSection
				title="Trusted Domains"
				description="Provide a list of whitelisted domains for the chat widget, so it can only be displayed on your owned pages."
			/>
			<ListDetailSection
				title="Embed Code"
				description="Grab a customized embed code for your Chat Widget. Just paste the script tag into your website."
			/>
		</Container>
	)
};

export default WidgetSettings;