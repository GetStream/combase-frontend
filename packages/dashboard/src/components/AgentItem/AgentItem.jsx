import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';

import Box from '@combase.app/ui/Box'
import Chip from '@combase.app/ui/Chip'
import Dropdown from '@combase.app/ui/Dropdown'
import IconButton from '@combase.app/ui/IconButton'
import IconLabel from '@combase.app/ui/IconLabel'
import { BadgeIcon, ChangeRoleIcon, CheckCircleIcon, ClockIcon, DeactivateIcon, DeleteIcon, MoreIcon, RoleIcon, UserIcon } from '@combase.app/ui/icons'
import ListItem from '@combase.app/ui/ListItem'
import MenuItem from '@combase.app/ui/MenuItem'
import Popover, { usePopoverState } from '@combase.app/ui/Popover'
import Text from '@combase.app/ui/Text'
import Modal from '@combase.app/ui/Modal';

import { AgentEntity } from 'components/Entities';
import ChangeRoleDialog from 'components/ChangeRoleDialog';
import DeactivateAgentDialog from 'components/DeactivateAgentDialog';
import DeleteAgentDialog from 'components/DeleteAgentDialog';

const AccessChip = styled(Chip)`
	text-transform: capitalize;
`;

const AgentItem = ({ access, active, avatar, _id, meta, name }) => {
	const theme = useTheme();
	const history = useHistory();
	const { agentId } = useParams();

	const [openRoleDialog, toggleRoleDialog] = useToggle();
	const [openDeactivateDialog, toggleDeactivateDialog] = useToggle();
	const [openDeleteDialog, toggleDeleteDialog] = useToggle();

	const [menuAnchorRef, { open, toggle: toggleMenu }] = usePopoverState();

	const handleClickMore = useCallback((_id, e) => {
		e.stopPropagation();
		toggleMenu();
	}, [_id]);

	return (
		<ListItem 
			active={agentId === _id}
			key={_id}
			columnTemplate={agentId ? "1fr 1fr 1fr min-content" : "1fr 1fr 1fr 1fr min-content"} 
			interaction="highlight"
			onClick={() => _id ? history[agentId ? 'replace' : 'push'](`/agents/${_id}`) : null} 
		>
			<AgentEntity avatar={avatar} meta={meta} name={name} />
			<Box>
				<AccessChip color={`access.${access}`} icon={RoleIcon} label={access} reverse variant="ghost" />
			</Box>
			<Box>
				<IconLabel>
					<ClockIcon />
					<Text>Yesterday</Text>
				</IconLabel>
			</Box>
			{
				!agentId ? (
					<Box>
						<Chip 
							backgroundColor={theme.dark ? "surface" : "offWhite"}
							color="text"
							icon={BadgeIcon} 
							label={active ? "Active Account" : "Deactivated"}
							iconProps={{ color: active ? 'green' : "altText" }}
							reverse
							variant={null}
						/>
					</Box>
				) : null
			}
			<IconButton ref={menuAnchorRef} icon={MoreIcon} onClick={handleClickMore} value={_id} />
			<Popover anchor={menuAnchorRef.current} as={Dropdown} open={open} onClose={toggleMenu} placement="left-start">
				<MenuItem 
					icon={UserIcon}
					label="View Profile"
					onClick={() => {
						toggleMenu(false);
						history[agentId ? 'replace' : 'push'](`/agents/${_id}`)
					}}
				/>
				<MenuItem 
					icon={ChangeRoleIcon}
					label="Change Role"
					onClick={() => {
						toggleMenu(false);
						toggleRoleDialog(true);
					}}
				/>
				<MenuItem 
					icon={active ? DeactivateIcon : CheckCircleIcon}
					label={active ? "Deactivate" : "Activate"}
					onClick={(e) => {
						toggleMenu(false);
						toggleDeactivateDialog();
					}}
				/>
				<MenuItem 
					icon={DeleteIcon}
					label="Delete"
					onClick={(e) => {
						toggleMenu(false);
						toggleDeleteDialog();
					}}
				/>
			</Popover>
			<Modal component={ChangeRoleDialog} open={openRoleDialog} onClose={() => toggleRoleDialog(false)} agentId={_id} />
			<Modal component={DeactivateAgentDialog} open={openDeactivateDialog} onClose={() => toggleDeactivateDialog(false)} active={active} agentId={_id} />
			<Modal component={DeleteAgentDialog} open={openDeleteDialog} onClose={() => toggleDeleteDialog(false)} agentId={_id} />
		</ListItem>
	);
};

export default AgentItem;