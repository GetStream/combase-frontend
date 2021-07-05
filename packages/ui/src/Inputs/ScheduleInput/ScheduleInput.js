import React, { useRef } from 'react';
import styled from 'styled-components';
import { FieldArray, Field } from 'formik';
import { capitalCase } from 'change-case';

import Box from '../../Box';
import Card from '../../Card';
import EmptyView from '../../EmptyView';
import IconButton from '../../IconButton';
import Text, { Heading } from '../../Text';
import TextGroup from '../../TextGroup';
import { AddCircleIcon, CloseCircleIcon } from '../../icons';
import ListSubheader from '../../ListSubheader'
import Tooltip from '../../Tooltip';

import { Switch } from '../Switch';
import { TextInput } from '../TextInput';
import { ButtonGroupInput } from '../ButtonGroupInput';

const Grid = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: ${({ theme }) => theme.space[4]};
`;

const Header = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Times = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr ${({ theme }) => theme.space[10]};
    grid-column-gap: .75rem;
    & > div:last-child {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        & > * + * {
            margin-left: ${({ theme }) => theme.space[3]};
        }
    }

    & + & {
        margin-top: ${({ theme }) => theme.space[3]};
    }
`;

const DeleteButton = styled(IconButton)`
    position: absolute;
    top: ${({ theme }) => theme.space[5]};
    right: ${({ theme }) => theme.space[5]};
`;

const Footer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const EntryCard = styled(Card)`
	border: 1px solid ${({ theme }) => theme.colors.border};
`

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const options = days.map(value => ({
    label: capitalCase(value).slice(0, 3),
    value,
}));

const newScheduleEntry = { enabled: false, day: [], time: [{}] };
const ScheduleInput = ({ onChange, name, value }) => {
    const renderScheduleEntries = ({ push, remove }) =>
        value?.map(({ enabled, day, time }, index) => (
            <>
				<EntryCard backgroundColor="background" key={index} paddingTop={5} paddingBottom={7} paddingX={5}>
					<Header marginBottom={4}>
						<TextGroup>
							<Heading fontSize={4} lineHeight={4}>
								Schedule Entry
								<Text fontSize={3} lineHeight={5} color={enabled ? 'green' : 'red'}>
									{enabled ? 'Enabled' : 'Disabled'}
								</Text>
							</Heading>
						</TextGroup>
						<Field type='checkbox' size={2} name={`${name}.${index}.enabled`} />
					</Header>
					{index > 0 ? (
						<Tooltip text="Delete Schedule Entry" placement="left">
							<DeleteButton color="error" icon={CloseCircleIcon} size={5} onClick={() => remove(index)} />
						</Tooltip>
					) : null}
					<ListSubheader marginY={1}>Day Range:</ListSubheader>
					<ButtonGroupInput name={`${name}.${index}.day`} options={options} onChange={onChange} value={day} />
					<ListSubheader marginTop={2} marginBottom={1}>
						Time:
					</ListSubheader>
					<FieldArray name={`${name}.${index}.time`}>
						{timesArray =>
							time?.map(({ start, end }, i) => {
								return (
									<Times key={i}>
										<div>
											<TextInput
												size="sm"
												forceFocus
												label="Start Time"
												name={`${name}.${index}.time.${i}.start`}
												onChange={onChange}
												type="time"
												value={start}
											/>
										</div>
										<div>
											<TextInput
												size="sm"
												forceFocus
												label="End Time"
												name={`${name}.${index}.time.${i}.end`}
												onChange={onChange}
												type="time"
												value={end}
											/>
										</div>
										<div>
											{i > 0 || i === 0 && time.length > 1 ? (
												<IconButton color={'red'} size={4} icon={CloseCircleIcon} onClick={() => timesArray.remove(i)} />
											) : null}
											{i === time.length - 1 ? (
												<IconButton color={'text'} size={4} icon={AddCircleIcon} onClick={() => timesArray.push({})} />
											) : null}
										</div>
									</Times>
								);
							})
						}
					</FieldArray>
				</EntryCard>
				{index + 1 === value?.length ? (
					<EmptyView onClick={() => push(newScheduleEntry)} icon={<AddCircleIcon color="altText" size={10} />} title="Add a Schedule Entry">
						<Text color="altText">Create a new schedule entry to split your availability or create alternate schedules</Text>
					</EmptyView>
				) : null}
			</>
        ));

    return (
        <Grid paddingY={8}>
            <FieldArray name={name} render={renderScheduleEntries} />
        </Grid>
    );
};

export default ScheduleInput;
