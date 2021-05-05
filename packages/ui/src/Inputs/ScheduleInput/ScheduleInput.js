import React from 'react';
import styled from 'styled-components';
import { FieldArray } from 'formik';
import { capitalCase } from 'change-case';

import { Box } from '../../Layout';
import { Card } from '../../Cards';
import { IconLabel } from '../../IconLabel';
import { Button, IconButton } from '../../Buttons';
import { Heading, Text, TextGroup } from '../../Text';
import { AddCircleIcon, AddIcon, CloseCircleIcon } from '../../icons';
import { Switch } from '../../Inputs';
import { ListSubheader } from '../../Lists';
import { Tooltip } from '../../Popovers';

import { TextInput } from '../TextInput';
import { ButtonGroupInput } from '../ButtonGroupInput';

const Grid = styled(Box)``;

const Times = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr ${({ theme }) => theme.space[10]};
    grid-column-gap: 1.5rem;
    max-width: ${({ theme }) => theme.sizes[17]};
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

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const options = days.map(value => ({
    label: capitalCase(value).slice(0, 3),
    value,
}));

const newScheduleData = { enabled: false, day: [], time: [{}] };
const ScheduleInput = ({ canSave, onChange, onSubmit, name, value }) => {
    const renderScheduleEntries = ({ push, remove }) =>
        value?.map(({ enabled, day, time }, index) => (
            <>
                <Card boxShadow={1} backgroundColor="background" key={index} paddingTop={5} paddingBottom={7} paddingX={5} marginBottom={7}>
                    <TextGroup gapTop={2} marginBottom={4}>
                        <Heading fontSize={4} lineHeight={4}>
                            Schedule Entry
                        </Heading>
                        <IconLabel>
                            <Switch size={1} name={`${name}.${index}.enabled`} onChange={onChange} value={enabled} />
                            <Text fontSize={2} lineHeight={2} color={enabled ? 'green' : 'red'}>
                                {enabled ? 'Enabled' : 'Disabled'}
                            </Text>
                        </IconLabel>
                    </TextGroup>
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
                </Card>
                {index + 1 === value?.length ? (
                    <Footer>
                        <Button variant="flat" onClick={() => push(newScheduleData)}>
							<AddIcon />
                            <Text>Add Schedule Entry</Text>
                        </Button>
                    </Footer>
                ) : null}
            </>
        ));

    return (
        <Grid>
            <FieldArray name={name} render={renderScheduleEntries} />
        </Grid>
    );
};

export default ScheduleInput;
