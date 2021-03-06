import { ToggleGroup, ToggleGroupOption } from '@combase.app/ui/ToggleGroup';
import { GridViewIcon, ListViewIcon } from '@combase.app/ui/icons'; 

export const ListModeToggle = ({ onChange, value }) => (
	<ToggleGroup activeBackgroundColor="white" onChange={onChange} value={value}>
		<ToggleGroupOption value="list">
			<Tooltip text="List">
				<div>
					<ListViewIcon color={value === 'list' ? 'text' : undefined} size={4} />
				</div>
			</Tooltip>
		</ToggleGroupOption>

		<ToggleGroupOption value="grid">
			<Tooltip text="Grid">
				<div>
					<GridViewIcon color={value === 'grid' ? 'text' : undefined} size={4} />
				</div>
			</Tooltip>
		</ToggleGroupOption>
	</ToggleGroup>
);