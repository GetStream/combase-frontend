import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';
import { Link } from 'react-router-dom';

import Avatar from '../../Avatar';
import Box from '../../Box';
import Card from '../../Card';
import { ChevronRightIcon, RoleIcon } from '../../icons';
import { IconLabel } from '../../IconLabel';
import Placeholder from '../../Placeholder';
import { Heading, Text, TextGroup } from '../../Text';

const Root = styled(Card)`
    ${interactions};
    border-radius: ${({ theme }) => theme.borderRadius * 4}rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
`;

const Meta = styled.div`
    padding-top: 1rem;
    padding-bottom: 1.5rem;
`;

export const AgentGridItem = ({ _id, name, role }) => {
    return (
        <Root as={Link} to={`/dashboard/agents/${_id}`} padding={6} interaction="bump">
            <Avatar name={name} size={10} />
            <Box paddingTop={3} paddingBottom={8}>
                <TextGroup>
                    <Heading fontSize={6} lineHeight={6} as={!name ? Placeholder : undefined} placeholderWidth={11}>
                        {name}
                    </Heading>
                    <Text as={!role ? Placeholder : undefined} opacity={0.56} fontSize={3}>
                        {role}
                    </Text>
                </TextGroup>
                <IconLabel icon={RoleIcon} label="Admin" />
            </Box>
            <IconLabel color="altText" reverse>
                <ChevronRightIcon size={2} />
                <Text fontSize={2} lineHeight={3}>
                    {'View Agent'}
                </Text>
            </IconLabel>
        </Root>
    );
};

AgentGridItem.propTypes = {
    name: PropTypes.string,
};
