import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Box, Card, ChevronRightIcon, Chip, Heading, IconLabel, Placeholder, Badge, Text, Tooltip } from '@combase.app/ui';
import { Link } from 'react-router-dom';

const Root = styled(Card).attrs({
    as: Link,
    padding: 5,
})`
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    & ${Chip} {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const IntegrationGridItem = ({ icon, id, name, version }) => (
    <Root to={`/dashboard/integrations/${id}`}>
        <Avatar borderRadius="circle" name={name} size={10} />
        <Box paddingY={3} marginBottom={4}>
            <Heading marginBottom={1} as={!name ? Placeholder : undefined} fontSize={5} lineHeight={6}>
                {name}
            </Heading>
            <Chip label={`v${version}`} />
        </Box>
        <Footer>
            <IconLabel color="altText" reverse>
                <ChevronRightIcon />
                <Text>View Plugin</Text>
            </IconLabel>
            <Tooltip text="Inactive">
                <Badge color="border" />
            </Tooltip>
        </Footer>
    </Root>
);

IntegrationGridItem.propTypes = {
    name: PropTypes.string,
};
