import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Form, Formik } from 'formik';
import { itemGap } from '@combase.app/styles';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import isSameDay from 'date-fns/isSameDay';
import add from 'date-fns/add';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import IconButton from '@combase.app/ui/IconButton';
import { AddCircleIcon, AddSplitIcon, DeleteIcon, CloseCircleIcon, PublicIcon } from '@combase.app/ui/icons';
import MenuItem from '@combase.app/ui/MenuItem';
import SelectButton from '@combase.app/ui/SelectButton';
import Text from '@combase.app/ui/Text';
import TextLink from '@combase.app/ui/TextLink';
import Tooltip from '@combase.app/ui/Tooltip';

import { GET_MY_PROFILE } from 'apollo/operations/auth';
import { UPDATE_AGENT } from 'apollo/operations/agent';

import {DialogFooter} from 'components/Dialog';
import HeaderBase from 'components/HeaderBase';

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
`;

const Footer = styled(DialogFooter)`
	position: sticky;
	bottom: 0;
	border: 0;
	padding: ${({ theme }) => theme.space[7]};
	background-color: ${({ theme }) => theme.colors.surface};
`;

const Entry = styled(Box)`
	display: flex;
	align-items: flex-start;
	& > ${Text} {
		align-self: center;
	}

	& > * + * {
		${itemGap};
	}
`;

const TimeEntry = styled(Entry)`
	& + & {
		margin-top: ${({ theme }) => theme.space[2]};
	}

	& button {
		align-self: center;
	}
`;

const start = startOfDay(new Date());
let current = start;
const step = { minutes: 15 };
const steps = [];
do {
	steps.push(current);
	current = add(current, step);
} while (isSameDay(start, current));

const getLabelProp = (value, children) => {
	return children?.find(({ props }) => props.value === value)?.props.label;
};

const getDayLabel = (value, children) => {
	if (value.length > 1) {
		if (value.length === 5 && !value.includes('saturday') && !value.includes('sunday')) {
			return 'Weekdays';
		} else if (value.length === 2 && value.includes('saturday') && value.includes('sunday')) {
			return 'Weekends';
		} else if (value.length === 7) {
			return 'Everyday';
		} else {
			let labels = value.map((val) => getLabelProp(val, children)?.slice(0, 3));
			if (value.length < 5) {
				return labels.join(',');
			}
			return `${labels.length} days`
		}
	} else {
		return getLabelProp(value[0], children);
	}
};

const emptyTime = [
	{
		start: '',
		end: '',
	}
];

const emptySchedule = {
	enabled: true,
	day: [],
	time: emptyTime
};

const Availability = () => {
	const [updateAgent, { loading }] = useMutation(UPDATE_AGENT);
	const { data } = useQuery(GET_MY_PROFILE, { fetchPolicy: 'cache-and-network' });

	const initialValues = useMemo(() => ({
		schedule: data?.me?.schedule?.length ? data.me.schedule.map(({
			enabled,
			day,
			time,
		}) => ({
			enabled,
			day,
			time: time.map((t) => ({
				start: t.start,
				end: t.end,
			})),
		})) : [
			{
				enabled: true,
				day: [],
				time: emptyTime
			}
		]
	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateAgent({
				variables: {
					_id: data.me._id,
					record: {
						schedule: values.schedule.map(s => ({
							...s,
							time: s.time.map(({ start, end }) => {
								const [startHour, startMinute] = start.split(':');
								const [endHour, endMinute] = end.split(':');
			
								return {
									start: {
										hour: parseInt(startHour, 10),
										minute: parseInt(startMinute, 10),
									},
									end: {
										hour: parseInt(endHour, 10),
										minute: parseInt(endMinute, 10),
									},
								};
							})
						})),
					}
				}
			});
			toast.dark(`Availability schedule saved.`)
		} catch (error) {
			toast.error(error.message);
		}
	}, [data]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				(formik) => (
					<Box height="100%" as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Availability
							</Text>
						</Header>
						<Container paddingX={7}>
							<Text maxWidth={20} fontSize={4} lineHeight={6} fontWeight={400}>Set your availability to be added to the routing pool during your available work hours.</Text>
							<Text marginY={5} maxWidth={20} fontSize={4} lineHeight={6} fontWeight={400}>Your timezone is currently set to <Text as={Link} color="primary" to="/settings/your-profile" fontSize={4} lineHeight={4} fontWeight={800}>{data?.me?.timezone}</Text></Text>
							<TextLink 
								as={Link}
								color="primary" 
								marginBottom={7} 
								icon={PublicIcon} 
								to="/settings/your-profile" 
								reverse
							>
								Change Timezone
							</TextLink>
							<FieldArray
								name="schedule"
								render={arrayHelpers => {
									return (
										<>
											{formik.values.schedule.map((entry, index) => (
												<Entry gapRight={2} paddingY={2}>
													<SelectButton 
														label="Day" 
														multi 
														getLabel={getDayLabel}
														name={`schedule.${index}.day`} 
														onChange={formik.handleChange}
														value={entry.day}
													>
														<MenuItem label="Monday" value="monday" />
														<MenuItem label="Tuesday" value="tuesday" />
														<MenuItem label="Wednesday" value="wednesday" />
														<MenuItem label="Thursday" value="thursday" />
														<MenuItem label="Friday" value="friday" />
														<MenuItem label="Saturday" value="saturday" />
														<MenuItem label="Sunday" value="sunday" />
													</SelectButton>
													<Box>
														<FieldArray 
															name={`schedule.${index}.time`}
															render={arrayHelpers => entry.time.map((_, timeIndex) => (
																<TimeEntry gapLeft={2}>
																	<Text>from</Text>
																	<SelectButton 
																		label="Start" 
																		maxHeight={19} 
																		name={`schedule.${index}.time.${timeIndex}.start`} 
																		onChange={formik.handleChange}
																		value={entry.time[timeIndex].start}
																	>
																		{steps.map((step, i) => {
																			const hr12 = format(step, 'hh:mm a');
																			const hr24 = format(step, 'H:mm');
																			return <MenuItem key={i} label={hr12} value={hr24} />
																		})}
																	</SelectButton>
																	<Text>to</Text>
																	<SelectButton 
																		label="End" 
																		maxHeight={19} 
																		name={`schedule.${index}.time.${timeIndex}.end`} 
																		onChange={formik.handleChange}
																		value={entry.time[timeIndex].end}
																	>
																		{steps.map((step, i) => {
																			const hr12 = format(step, 'hh:mm a');
																			const hr24 = format(step, 'H:mm');
																			return <MenuItem key={i} label={hr12} value={hr24} />
																		})}
																	</SelectButton>
																	{
																		timeIndex !== 0 ? (
																			<Tooltip text="Remove Split">
																				<IconButton color="text" type="button" size={4} icon={CloseCircleIcon} onClick={() => arrayHelpers.remove(timeIndex)} />
																			</Tooltip>
																		) : null
																	}
																	{
																		timeIndex === entry.time.length - 1 ? (
																			<Tooltip text="Split Time">
																				<IconButton color="text" type="button" size={4} icon={AddSplitIcon} onClick={() => arrayHelpers.push(emptyTime)} />
																			</Tooltip>
																		) : null
																	}
																</TimeEntry>
															))}
														/>
													</Box>
													<Box paddingTop={3}>
														<Tooltip text="Delete Schedule Entry">
															<IconButton 
																color="error" 
																type="button" 
																size={4} 
																icon={DeleteIcon} 
																onClick={() => arrayHelpers.remove(index)} 
															/>
														</Tooltip>
													</Box>
												</Entry>
											))}
											<TextLink marginY={4} onClick={() => arrayHelpers.push(emptySchedule)} color="primary" icon={AddCircleIcon}>Add Schedule Entry</TextLink>
										</>
									)
								}}
							/>
						</Container>
						<Footer>
							<Button color="altText" variant="flat">
								<Text color="altText">Cancel</Text>
							</Button>
							<Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit">
								<Text color="white">Save</Text>
							</Button>
						</Footer>
					</Box>
				)
			}
		</Formik>
	)
};

export default Availability