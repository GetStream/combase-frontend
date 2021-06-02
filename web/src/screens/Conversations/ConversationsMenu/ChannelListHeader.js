import React from 'react';
import styled from 'styled-components';

import {
	Box,
	Checkbox,
	CloseIcon,
	Container,
	EditIcon,
	IconButton,
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
			showOrganization={!selectable && isSm?.matches && !isXl?.matches}
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
			title={inbox}
			subtitle={selectable ? `${selected?.length || 0} selected` : !isSm?.matches ? `${totalCount || 0} tickets` : undefined}
			onTitleClick={!selectable && !isXl.matches ? onTitleClick : null}
		>
			{inbox !== 'unassigned' && inbox !== 'archived' ? (
				<Container paddingBottom={3}>
					<ToggleGroup onChange={onChangeStatus} value={status}>
						<ToggleGroupOption value="open">
							Open
						</ToggleGroupOption>
						<ToggleGroupOption value="closed">
							Closed
						</ToggleGroupOption>
					</ToggleGroup>
				</Container>
			) : null}
		</PageHeader>
	)
};

export default ChannelListHeader;