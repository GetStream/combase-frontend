import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
    Box,
    CloseIcon,
    IconButton,
    PageHeader,
	MenuItem,
	Popover,
	Dropdown,
} from '@combase.app/ui';
import { DynamicActionsWidget, PartnerInfoWidget, TicketTagsWidget } from 'components/DetailDrawer/widgets';
import { Scrollbars } from 'rc-scrollbars';
// import { ActivityFeed } from 'components/ActivityFeed';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.surface};
	border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const DetailDrawer = ({ onClose }) => {
	const [menuAnchor, setMenuAnchor] = useState();

	const handleTitleClick = useCallback((e) => {
		const anchor = e.target.closest('#pageTitleRoot');
		setMenuAnchor(anchor);
	}, []);

    return (
        <Root>
			<PageHeader
				hideLeftAction
				title="Overview"
				onTitleClick={handleTitleClick}
				actions={[<IconButton color="altText" icon={CloseIcon} onClick={onClose} />]}
			/>
			<Popover
				anchor={menuAnchor}
				as={Dropdown}
				onClose={() => setMenuAnchor(false)}
				placement={'bottom-start'}
				minWidth={14}
			>
				<MenuItem label="Overview" />
				<MenuItem label="Activity Feed" />
			</Popover>
			<Scrollbars>
				<PartnerInfoWidget />
				<TicketTagsWidget />
				<DynamicActionsWidget />
			</Scrollbars>
        </Root>
    );
};

export default DetailDrawer;
