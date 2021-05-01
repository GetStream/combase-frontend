import React from 'react';
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

export const Primary = () => (
    <Grid>
        <Wrapper gapTop={4}>
            <SelectButton label="Language">
				<MenuItem label="JavaScript" />
				<MenuItem label="Java" />
				<MenuItem label="Swift" />
				<MenuItem label="Dart" />
				<MenuItem label="Python" />
				<MenuItem label="Go" />
				<MenuItem label="Kotlin" />
			</SelectButton>
        </Wrapper>
    </Grid>
);

export default {
    component: SelectButton,
    title: 'Buttons/SelectButton',
};
