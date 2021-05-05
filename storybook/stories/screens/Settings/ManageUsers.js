import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { gql, useMutation, useQuery, GET_ORGANIZATION_PROFILE, GET_AGENTS } from '@combase.app/apollo';

import { Box, Button, DropdownIcon, TableHeader, Text, Tooltip, useBulkSelect, useEntities } from '@combase.app/ui';

const Root = styled(Box)`
    dwidth: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ManageUsers = () => {
    const [agents] = useEntities(GET_AGENTS);
	const [selectableItem, bulkCheckbox, selected] = useBulkSelect(agents?.edges || [], true);

    return (
        <Root>
			<TableHeader
				backgroundColor="background"
				columnTemplate="1fr 1.5fr 0.5fr 1fr"
				indeterminate={bulkCheckbox.indeterminate}
				onBulkSelect={bulkCheckbox.onChange}
				checked={bulkCheckbox.value}
				selectable
			>
				<div>
					<Tooltip text="Sort by Name">
						<Button size="xs" variant="flat">
							<Text>{'Name'}</Text>
						</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip text="Sort by Group">
						<Button size="xs" variant="flat">
							<Text>{'Groups'}</Text>
						</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip text="Sort by Chat Count">
						<Button size="xs" variant="flat">
							<Text>{'Chats'}</Text>
						</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip text="Newest First">
						<Button size="xs" variant="flat">
							<Text>{'Created'}</Text>
							<DropdownIcon size={3} />
						</Button>
					</Tooltip>
				</div>
			</TableHeader>
		</Root>
    );
};

export default ManageUsers;
