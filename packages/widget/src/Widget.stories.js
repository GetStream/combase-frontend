import styled from 'styled-components';

import Widget from '.';

const Root = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
`;

export const Default = (props, context) => (
	<Root>
		<Widget organization={process.env.STORYBOOK_TEST_ORGANIZATION} theme={context.globals.theme} />
	</Root>
);

export default {
    component: Default,
    title: 'Widget/Widget',
};
