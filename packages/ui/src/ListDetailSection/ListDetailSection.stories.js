import React from 'react';

import Container from '../Container';
import Text from '../Text';

import ListDetailSection from './ListDetailSection';

export const ProfileSettings = () => {
    return (
		<Container variant="fluid">
			<ListDetailSection
				title="Your Profile"
				description="Customize how you will appear in conversations with end-users."
			>
				<Text>Content</Text>
			</ListDetailSection>
			<ListDetailSection
				title="Availability"
				description="Customize the days and time-periods that you will be available in the auto-routing pool for new conversations."
			>
				<Text>Content</Text>
			</ListDetailSection>
		</Container>
	);
};

export const OrganizationSettings = () => {
    return (
		<ListDetailSection
			title="Company Logo"
			description="Upload your company logo to display it on your profile, and optionally override Combase branding in the dashboard."
		>
			<Text>Content</Text>
		</ListDetailSection>
	);
};

export const WidgetSettings = () => {
    return (
		<Container variant='fluid'>
			<ListDetailSection
				title="Trusted Domains"
				description="Provide a list of whitelisted domains for the chat widget, so it can only be displayed on your owned pages."
			/>
			<ListDetailSection
				title="Welcome Message"
				description="Edit the series of message(s) that a end-user will receive upon starting a new conversation."
			/>
		</Container>
	);
};

export default {
    component: ListDetailSection,
    title: 'shared/ListDetailSection',
};
