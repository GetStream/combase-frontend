import styled from 'styled-components';
import { Avatar, Box, Container, Placeholder, SidebarHeader, TextGroup, Text, TextLink } from '@combase.app/ui';

import useIntegrationDefinition from 'hooks/useIntegrationDefinition';

const Root = styled(Container)`
    position: sticky;
    top: ${({ theme }) => theme.sizes[10]};
`;

const IntegrationSidebar = () => {
    const [integration] = useIntegrationDefinition();

    return (
        <Root>
            <SidebarHeader fluid goBack gutter={false} />
			<Box>
				<Avatar borderRadius="circle" name={integration?.name} size={11} />
				<TextGroup marginTop={4} gapTop={2}>
					<Text
						as={!integration?.name ? Placeholder : undefined}
						placeholderWidth={14}
						fontSize={6}
						fontWeight="700"
						lineHeight={7}
					>
						{integration?.name}
					</Text>
					<Text color="primary" fontSize={3} lineHeight={3} placeholderWidth={10}>
						by Stream
					</Text>
				</TextGroup>
				<Text marginTop={7} opacity={0.56} fontSize={3} lineHeight={6} placeholderWidth={10}>
					SendGrid provide SaaS based transactional email APIs. Integrate SendGrid into Combase today to power email tickets, customer follow-ups, and much more.
				</Text>
			</Box>
			<Box marginTop={7}>
				<TextGroup marginY={4} gapTop={2}>
					<Text fontSize={2} lineHeight={2} opacity={0.56} fontWeight="600">
						Categories
					</Text>
					<Text as={!integration?.category ? Placeholder : undefined} fontSize={3} lineHeight={3} placeholderWidth={8}>
						{integration?.category?.[0]}
					</Text>
				</TextGroup>
				<TextGroup marginY={4} gapTop={2}>
					<Text fontSize={2} lineHeight={2} opacity={0.56} fontWeight="600">
						Package
					</Text>
					<TextLink
						as={!integration?.internal ? Placeholder : 'a'}
						fontSize={3}
						lineHeight={3}
						placeholderWidth={8}
						target="_blank"
						href={`https://www.npmjs.com/package/${integration?.internal?.name}`}
					>
						{integration?.internal?.name}
					</TextLink>
				</TextGroup>
				<TextGroup marginY={4} gapTop={2}>
					<Text fontSize={2} lineHeight={2} opacity={0.56} fontWeight="600">
						Version
					</Text>
					<Text as={!integration?.internal ? Placeholder : undefined} fontSize={3} lineHeight={3} placeholderWidth={8}>
						{integration?.internal?.version}
					</Text>
				</TextGroup>
			</Box>
        </Root>
    );
};

export default IntegrationSidebar;
