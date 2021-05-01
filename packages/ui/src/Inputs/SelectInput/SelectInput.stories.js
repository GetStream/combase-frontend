import { useState } from 'react';

import { MenuItem } from '../../Lists';
import { Checkbox } from '../Checkbox/index';
import SelectInput from './SelectInput';

export const Default = () => {
	const [value, handleChange] = useState('Go')

	return (
		<SelectInput name="language" label="Language" onChange={(e) => handleChange(e.target.value)} value={value}>
			<MenuItem label="Dart" value="Dart" />
			<MenuItem label="Swift" value="Swift" />
			<MenuItem label="Java" value="Java" />
			<MenuItem label="Javascript" value="Javascript" />
			<MenuItem label="Go" value="Go" />
			<MenuItem label="Python" value="Python" />
			<MenuItem label="Kotlin" value="Kotlin" />
		</SelectInput>
	)
}

export const Multiselect = () => {
	const [value, handleChange] = useState(['Go'])

	return (
		<SelectInput multi name="language" label="Language" onChange={(e) => handleChange(e.target.value)} value={value}>
			<MenuItem label="Dart" value="Dart" />
			<MenuItem label="Swift" value="Swift" />
			<MenuItem label="Java" value="Java" />
			<MenuItem label="Javascript" value="Javascript" />
			<MenuItem label="Go" value="Go" />
			<MenuItem label="Python" value="Python" />
			<MenuItem label="Kotlin" value="Kotlin" />
		</SelectInput>
	)
}

export default {
	components: SelectInput,
	title: 'Inputs/SelectInput'
}