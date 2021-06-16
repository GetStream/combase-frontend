import { memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'react-use';
import { useMutation, REMOVE_TAG } from '@combase.app/apollo';

import { 
	DeleteIcon,
	Dropdown,
	IconButton, 
	ListItem, 
	MenuItem,
	MoreIcon,
	Popover
} from '@combase.app/ui';

import { TagEntity } from 'components/Entities';

const TagListItem = memo(({ name, ...rest }) => {
	const [menuOpen, toggleMenu] = useToggle();
	const btnRef = useRef();

	const [removeTag, { loading: deleting }] = useMutation(REMOVE_TAG)

	const handleRemoveTag = useCallback(async () => {
		try {
			await removeTag({
				optimisticResponse: {
					tagRemove: {
						record: {
							name,
							__typename: 'Tag',
						},
						__typename: 'RemoveOneTagPayload',
					},
				},
				update: (cache, { data }) => {
					console.log(data);
					cache.evict(cache.identify(data.tagRemove.record));
				},
				variables: {
					name,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [name, removeTag]);

	return (
		<ListItem columnTemplate="1fr min-content" {...rest}>
			<TagEntity name={name} />
			<IconButton ref={btnRef} onClick={toggleMenu} color="altText" icon={MoreIcon} />
			<Popover
				as={Dropdown}
				anchor={btnRef.current}
				open={menuOpen}
				onClose={() => toggleMenu(undefined)}
				placement="bottom-end"
			>
				<MenuItem color="error" icon={DeleteIcon} label="Delete" onClick={handleRemoveTag} />
			</Popover>
		</ListItem>
	);
});

TagListItem.defaultProps = {
	name: PropTypes.string,
}

export default TagListItem;