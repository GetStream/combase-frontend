import { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@combase.app/ui';
import {TagEntity} from 'components/Entities';

const TagListItem = memo(({ amount, name, ...rest }) => (
    <ListItem {...rest}>
        <TagEntity name={name} />
    </ListItem>
));

TagListItem.defaultProps = {
	amount: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	name: PropTypes.string,
}

export default TagListItem;