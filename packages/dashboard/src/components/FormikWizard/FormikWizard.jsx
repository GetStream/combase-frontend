import React, {cloneElement, useCallback, useState} from 'react';
import styled from 'styled-components';
import {Form, Formik} from 'formik';

import Box from '@combase.app/ui/Box';

const Root = styled(Box)`
    display: flex;
    flex-direction: column;
	width: 100%;
`;

const Dot = styled.div`
    height: .5rem;
    width: .5rem;
    border-radius: 50%;
    background-color: ${({$active, theme}) => theme.colors[$active ? 'primary' : 'border']};
    opacity: ${({$active}) => $active ? 1 : 0.64};
`;

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    margin-top: 1.5rem;

    & > ${Dot} + ${Dot} {
        margin-left: .5rem;
    }
`;

const FormikWizard = ({children, initialValues, maxWidth, onSubmit}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);
    const steps = React.Children.toArray(children);

    const step = steps[currentStep];
    const totalSteps = steps.length;
    const isLastStep = currentStep === totalSteps - 1;

    const next = useCallback((values) => {
        setSnapshot(values);
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }, [totalSteps]);

    const handleSubmit = useCallback(async (values, form) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, form);
        }

        if (isLastStep) {
            return onSubmit(values, form);
        }

        form.setTouched({});

        return next(values);
    }, [isLastStep, next, onSubmit, step]);

    return (
        <Formik
            enableReinitialize
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {(formik) => (
                <Root
					as={Form}
                    onSubmit={formik.handleSubmit}
					maxWidth={maxWidth}
                >
                    {cloneElement(step, { isLastStep })}
                    <Pagination>
                        {children.map((_, i) => (
							<Dot
								$active={i === currentStep}
								key={i}
							/>
						))}
                    </Pagination>
                </Root>
            )}
        </Formik>
    );
};

export default FormikWizard;