export const initialState = {
	email: {
		error: false,
		focused: false,
		value: '',
	},
	name: {
		error: false,
		focused: false,
		value: '',
	},
	message: {
		error: false,
		focused: false,
		value: '',
	},
}

export const reducer = (state, action) => {
	switch (action.type) {
		case 'change':
			return {
				...state,
				[action.name]: {
					...state[action.name],
					value: action.value
				},
			}
		case 'focus':
			return {
				...state,
				[action.name]: {
					...state[action.name],
					focused: true,
				},
			}
		case 'blur':
			return {
				...state,
				[action.name]: {
					...state[action.name],
					focused: false,
				},
			}
		case 'error':
			return {
				...state,
				[action.name]: {
					...state[action.name],
					error: action.error,
				},
			}
		default:
			return state;
	}
};