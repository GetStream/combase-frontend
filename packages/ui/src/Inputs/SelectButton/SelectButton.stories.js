import React, {useState} from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import { Box } from '../../Layout';
import { MenuItem } from '../../Lists';

import { SelectButton } from '.';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Wrapper = styled(Box)`
    & > * + * {
        ${itemGap};
    }
`;

export const Primary = () => {
	const [value, setValue] = useState("");
	return <Grid>
		<Wrapper gapTop={4}>
			<SelectButton label="Language" value={value} onChange={({ target }) => setValue(target.value)}>
				<MenuItem label="JavaScript" value="js" />
				<MenuItem label="Java" value="java" />
				<MenuItem label="Swift" value="swift" />
				<MenuItem label="Dart" value="dart" />
				<MenuItem label="Python" value="python" />
				<MenuItem label="Go" value="go" />
				<MenuItem label="Kotlin" value="kotlin" />
			</SelectButton>
		</Wrapper>
	</Grid>;
}

export default {
    component: SelectButton,
    title: 'Inputs/SelectButton',
};
