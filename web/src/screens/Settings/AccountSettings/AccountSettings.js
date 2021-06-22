import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';

import { Box, Button, Card, Container, IconBubble, MailIcon, Modal, PageHeader, ScrollbarsWithContext, Text } from '@combase.app/ui';

import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import ConfigureTwoFactorModal from './ConfigureTwoFactorModal';
import ProfileInformationForm from './ProfileInformationForm';

const Grid = styled(Box)`
	display: grid;
	grid-gap ${({ theme }) => theme.space[4]};
	grid-template-columns: 1fr;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		grid-template-columns: 1fr 1fr;
	}
	
	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const FlexFill = styled.span`
	flex: 1 1 auto;
`

const PreferenceCard = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const AccountSettings = () => {
	const [openEmailModal, toggleEmailModal] = useToggle();
	const [openPasswordModal, togglePasswordModal] = useToggle();
	const [open2faModal, toggle2faModal] = useToggle();

	return (
		<ScrollbarsWithContext>
			<PageHeader backgroundColor="surface" variant="flat" title="Account Settings" />
			<ProfileInformationForm />
			<Container>
				{/* <ListDetailSection title="Login Credentials" description="Change your password, and configure how you access your Combase account." /> */}
				<Grid paddingY={6}>
					<PreferenceCard padding={6}>
						<IconBubble icon={MailIcon} size={10} />
						<Text marginTop={4} textAlign="center" fontSize={5} lineHeight={6} fontWeight="600">Email Address</Text>
						<FlexFill />
						<Text color="altText" textAlign="center" colorAlpha={0.5} marginTop={3} fontSize={2} lineHeight={4}>Change the email address you use to log in to Combase.</Text>
						<Text color="primary" marginTop={3} marginBottom={6} fontSize={3} lineHeight={4}>luke@getstream.io</Text>
						<FlexFill />
						<Button onClick={toggleEmailModal}>
							<Text color="white">Change Email</Text>
						</Button>
						<Modal component={ChangeEmailModal} open={openEmailModal} onClose={() => toggleEmailModal(false)} />
					</PreferenceCard>
					<PreferenceCard padding={6}>
						<IconBubble icon={MailIcon} size={10} />
						<Text marginTop={4} textAlign="center" fontSize={5} lineHeight={6} fontWeight="600">Password</Text>
						<FlexFill />
						<Text color="altText" textAlign="center" colorAlpha={0.5} marginTop={3} fontSize={2} lineHeight={4}>Change the password for your Combase account.</Text>
						<Text color="primary" marginTop={3} marginBottom={6} fontSize={3} lineHeight={4}>************</Text>
						<FlexFill />
						<Button onClick={togglePasswordModal}>
							<Text color="white">Change Password</Text>
						</Button>
						<Modal component={ChangePasswordModal} open={openPasswordModal} onClose={() => togglePasswordModal(false)} />
					</PreferenceCard>
					<PreferenceCard padding={6}>
						<IconBubble icon={MailIcon} size={10} />
						<Text marginTop={4} fontSize={5} lineHeight={6} textAlign="center" fontWeight="600">Two-Factor Authentication</Text>
						<FlexFill />
						<Text color="altText" textAlign="center" colorAlpha={0.5} marginTop={3} fontSize={2} lineHeight={4}>Configure two-factor auth for your Combase account.</Text>
						<Text color="error" marginTop={3} marginBottom={6} fontSize={3} lineHeight={4}>Disabled</Text>
						<FlexFill />
						<Button onClick={toggle2faModal}>
							<Text color="white">Configure 2FA</Text>
						</Button>
						<Modal component={ConfigureTwoFactorModal} open={open2faModal} onClose={() => toggle2faModal(false)} />
					</PreferenceCard>
				</Grid>
			</Container>
		</ScrollbarsWithContext>
	)
};

export default AccountSettings;