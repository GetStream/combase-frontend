import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Form, Formik } from 'formik';
import { itemGap } from '@combase.app/styles';
import { useMutation, useQuery } from '@apollo/client';

import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import isSameDay from 'date-fns/isSameDay';
import add from 'date-fns/add';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import { AddCircleIcon } from '@combase.app/ui/icons';
import MenuItem from '@combase.app/ui/MenuItem';
import SelectButton from '@combase.app/ui/SelectButton';
import Text from '@combase.app/ui/Text';
import TextLink from '@combase.app/ui/TextLink';

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
	align-items: center;
	& > * + * {
		${itemGap};
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

const emptySchedule = {
	enabled: true,
	day: [],
	time: {
		end: '',
		start: '',
	}
};

const Availability = () => {
	const [updateAgent, { loading }] = useMutation(UPDATE_AGENT);
	const {data} = useQuery(GET_MY_PROFILE);

	const initialValues = useMemo(() => ({
		schedule: data?.me?.schedule?.length ? data.me.schedule.map(({
			enabled,
			day,
			time,
		}) => ({
			enabled,
			day,
			time: {
				start: time.start,
				end: start.end
			},
		})) : [
			{
				enabled: true,
				day: [],
				time: {
					start: '',
					end: '',
				}
			}
		]
	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateAgent({
				variables: {
					_id: data.me._id,
					record: {
						schedule: values.schedule,
					}
				}
			})
		} catch (error) {
			console.error(error.message);
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
							<Text maxWidth={19} fontSize={4} lineHeight={6} fontWeight={400}>Set your availability to be added to the routing pool during your available work hours.</Text>
							<Text marginY={7} maxWidth={19} fontSize={4} lineHeight={6} fontWeight={400}>Your timezone is curently set to <Text as="span" fontSize={4} lineHeight={4} fontWeight={800}>Amsterdam (CEST)</Text></Text>
							<FieldArray
								name="schedule"
								render={arrayHelpers => {
									return (
										<>
											{formik.values.schedule.map((entry, index) => (
												<Entry gapRight={4} paddingY={2}>
													<SelectButton 
														label="Day" 
														multi 
														name={`schedule.${index}.day`} 
														onChange={formik.handleChange}
														value={formik.values.schedule[index].day}
													>
														<MenuItem label="Monday" value="monday" />
														<MenuItem label="Tuesday" value="tuesday" />
														<MenuItem label="Wednesday" value="wednesday" />
														<MenuItem label="Thursday" value="thursday" />
														<MenuItem label="Friday" value="friday" />
														<MenuItem label="Saturday" value="saturday" />
														<MenuItem label="Sunday" value="sunday" />
													</SelectButton>
													<Text>from</Text>
													<SelectButton 
														label="Start" 
														maxHeight={19} 
														name={`schedule.${index}.time.start`} 
														onChange={formik.handleChange}
														value={formik.values.schedule[index].time.start}
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
														name={`schedule.${index}.time.end`} 
														onChange={formik.handleChange}
														value={formik.values.schedule[index].time.end}
													>
														{steps.map((step, i) => {
															const hr12 = format(step, 'hh:mm a');
															const hr24 = format(step, 'H:mm');
															return <MenuItem key={i} label={hr12} value={hr24} />
														})}
													</SelectButton>
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
							<Button loading={loading} type="submit">
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