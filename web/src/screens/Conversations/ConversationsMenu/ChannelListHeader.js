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
			// centered={isSmallViewport}
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
								<Tooltip text="Queue">
									<IconLabel>
										<AllInboxesIcon size={4} color={status === 'queued' ? 'primary' : 'altText'} />
										<Chip label="99+" />
									</IconLabel>
								</Tooltip>
							</ToggleGroupOption>
							<ToggleGroupOption value="open">
								<Tooltip text="Assigned to You">
									<IconLabel>
										<InboxIcon color={status === 'open' ? 'primary' : 'altText'} size={4} />
										<Chip label="99+" />
									</IconLabel>
								</Tooltip>
							</ToggleGroupOption>
							<ToggleGroupOption value="closed">
								<Tooltip text="Done">
									<IconLabel>
										<CheckboxCheckedIcon color={status === 'closed' ? 'primary' : 'altText'} size={4} />
										<Chip label="99+" />
									</IconLabel>
								</Tooltip>
							</ToggleGroupOption>
						</ToggleGroup>
					</Container>
				) : null
			}
		</PageHeader>
	)
};

export default ChannelListHeader;