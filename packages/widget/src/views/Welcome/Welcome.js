import React from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import {
	Avatar,
	Badge,
	Box,
	Container,
	Button,
	IconLabel,
	TextInput,
	Heading,
	ScrollbarsWithContext,
	Text,
	TextGroup,
	Placeholder,
	Tooltip,
} from "@combase.app/ui";

import { useCreateTicket, useOrganization } from '../../WidgetConfig';

const Root = styled(Container)`
    display: flex;
    flex-direction: column;

    & > * + * {
        ${itemGap};
    }
`;

const FlexFill = styled.div`
    flex: 1 1 auto;
`;

const Submit = styled(Box)`
    display: flex;

    & button {
        width: 100%;
    }
`;

const Header = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${IconLabel} {
        cursor: default;
        justify-content: center;
    }
`;

const initialValues = { user: { name: '', email: '' }, record: { message: '' } };

const Welcome = () => {
    const [organization] = useOrganization();
    const [{ loading }, onSubmit] = useCreateTicket();

    const disabled = !organization?._id;
    return (
        <ScrollbarsWithContext>
            <Header paddingY={6}>
                <Avatar name={organization?.name} size={10} src={organization?.avatar} />
                <TextGroup marginTop={1} gapTop={1}>
                    <Heading placeholderWidth={12} as={disabled ? Placeholder : undefined}>
                        {organization?.name}
                    </Heading>
                    <Tooltip text={organization?.availableAgents ? `${organization.availableAgents.length} available agents` : null}>
                        <IconLabel>
                            <Badge color={disabled ? 'border' : 'green'} />
                            <Text as={disabled ? Placeholder : null} color="altText" fontSize={2} lineHeight={2}>
                                Available Now
                            </Text>
                        </IconLabel>
                    </Tooltip>
                </TextGroup>
            </Header>
            <Root as="form" onSubmit={(e) => e.preventDefault()} gapTop={2}>
				<TextInput
					disabled={disabled}
					forceFocus
					focusedPlaceholder="e.g. Luke"
					label="Name"
					name="user.name"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				<TextInput
					disabled={disabled}
					forceFocus
					focusedPlaceholder="e.g. luke@combase.app"
					label="Email"
					name="user.email"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<TextInput
					disabled={disabled}
					textarea
					rows={6}
					maxRows={10}
					forceFocus
					focusedPlaceholder="Let us know how we can help!"
					label="Message"
					name="record.message"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.message}
				/>
				<FlexFill />
				<Submit paddingY={4}>
					<Button disabled={disabled} loading={loading} type="submit">
						<Text>Start Conversation</Text>
					</Button>
				</Submit>
			</Root>
        </ScrollbarsWithContext>
    );
};

export default Welcome;
