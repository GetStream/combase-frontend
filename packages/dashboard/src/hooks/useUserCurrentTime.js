import { useState, useMemo, useCallback, useEffect } from 'react';
import { useInterval } from 'react-use';

const useUserCurrentTime = (timezone) => {
	const [currentTime, setCurrentTime] = useState(null);

	const timeFormatter = useMemo(() => {
		if (!timezone) return 'No Timezone Data Available.';

		const options = {
			timeZone: timezone,
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
			
		};

		return new Intl.DateTimeFormat([], options);
	}, [timezone]);

	const getUserTime = useCallback(() => {
		if (typeof timeFormatter === 'string') return timeFormatter;

		return timeFormatter.format(new Date())
	}, [timeFormatter]);

	useInterval(() => {
		setCurrentTime(getUserTime());
	}, 1000)

	useEffect(() => {
		setCurrentTime(getUserTime());
	}, [getUserTime]);

	return currentTime;
};

export default useUserCurrentTime;