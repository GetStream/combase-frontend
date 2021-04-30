import { useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import { Button } from 'ui';

const font = new FontFaceObserver('Basier Circle');

const App = () => {
	useEffect(() => {
		font.load().then(
			() => {
				document.body.classList.add('fontLoaded');
			},
			() => {
				document.body.classList.remove('fontLoaded');
			},
		);
	}, []);

	return (
		<Router>
			<Route>
				{() => (
					<>
						<h1>Hello, World!</h1>
						<Button>
							Test
						</Button>
					</>
				)}
			</Route>
		</Router>
	);
};

export default App;