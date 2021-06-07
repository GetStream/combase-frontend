import React from 'react';
import styled from 'styled-components';

import {
	AllInboxesIcon,
	Box,
	Checkbox,
	CheckboxCheckedIcon,
	Chip,
	CloseIcon,
	Container,
	EditIcon,
	IconButton,
	IconLabel,
	InboxIcon,
	PageHeader,
	Spinner,
	Text,
	ToggleGroup,
	ToggleGroupOption,
	Tooltip
} from '@combase.app/ui';
import { itemGap, layout } from "@combase.app/styles";
import { useReactiveMedia } from "hooks";

const BulkActions = styled(Box)`
	& > * + * {
		${itemGap};	
	}
`

const SpinnerWrapper = styled(Box)`
    ${layout.size};
`;

const ChannelListHeader = ({ 
	bulkCheckboxProps, 
	inbox, 
	loading, 
	onChangeStatus,
	onTitleClick, 
	selectable, 
	selected, 
	status,
	onEditClick, 
	totalCount 
}) => {
	const isSm = useReactiveMedia('sm');
    const isXl = useReactiveMedia('xl');

	const isSmallViewport = !isSm?.matches;

	return (
		<PageHeader
			leftIcon={
				selectable ? (
					<Box marginRight={3}>
						<Checkbox {...bulkCheckboxProps} />
					</Box>
				) : undefined
			}
			actions={
				<BulkActions gapLeft={3}>
					{loading ? (
						<SpinnerWrapper size={6}>
							<Spinner size={5} />
						</SpinnerWrapper>
					) : (
						<Tooltip text={selectable ? 'Cancel' : 'Edit'}>
							<IconButton
								color={selectable ? 'red' : 'altText'}
								size={4}
								icon={selectable ? CloseIcon : EditIcon}
								onClick={onEditClick}
							/>
						</Tooltip>
					)}
				</BulkActions>
			}
			animated={isSmallViewport}
			backgroundColor={isSmallViewport ? "background" : "surface"}
			hideLeftAction={isSm?.matches && !selectable}
			reverse={selectable || isSmallViewport}
			title={inbox !== 'archive' ? "Conversations" : "Archive"}
			subtitle={undefined}
			onTitleClick={!selectable && !isXl.matches ? onTitleClick : null}
		>
			{
				inbox !== 'archive' ? (
					<Container paddingBottom={3}>
						<ToggleGroup onChange={onChangeStatus} value={status}>
							<ToggleGroupOption value="queued">
								<IconLabel>
									<AllInboxesIcon size={4} color={status === 'queued' ? 'primary' : 'altText'} />
									<Text color={status === 'queued' ? 'primary' : 'altText'}>Queue</Text>
								</IconLabel>
							</ToggleGroupOption>
							<ToggleGroupOption value="open">
								<IconLabel>
									<InboxIcon color={status === 'open' ? 'primary' : 'altText'} size={4} />
									<Text color={status === 'open' ? 'primary' : 'altText'}>Inbox</Text>
								</IconLabel>
							</ToggleGroupOption>
							<ToggleGroupOption value="closed">
								<IconLabel>
									<CheckboxCheckedIcon color={status === 'closed' ? 'primary' : 'altText'} size={4} />
									<Text color={status === 'closed' ? 'primary' : 'altText'}>Done</Text>
								</IconLabel>
							</ToggleGroupOption>
						</ToggleGroup>
					</Container>
				) : null
			}
		</PageHeader>
	)
};

export default ChannelListHeader;