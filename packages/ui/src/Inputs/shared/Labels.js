import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { layout, space } from '@combase.app/styles';

import Box from '../../Box';
import Text from '../../Text';

const Root = styled(Box)`
    ${layout};
    display: flex;
    flex-direction: row;
    align-items: center;
	justify-content: space-between;
    overflow: hidden;
	width: 100%:
`;

const Label = styled(Text).attrs({ as: 'label' })`
    ${space};
    transform: ${({ $active }) => `translate3d(0, ${$active ? 0 : 100}%, 0)`};
    transition: 320ms transform ${({ theme }) => theme.easing.snapPing};
    will-change: transform;
`;

const ErrorText = styled(Text)`
    text-align: right;
`;

export const Labels = ({ error, fieldId, focused, hasValue, label, required }) => (
    <Root paddingX={2}>
        <Label $active={focused || hasValue} fontSize={2} fontWeight="600" htmlFor={fieldId} lineHeight={2} paddingY={1}>
            {label}
        </Label>
        <ErrorText color="error" fontSize={2} fontWeight="600" htmlFor={fieldId} lineHeight={2}>
            {error || (required && '*') || ''}
        </ErrorText>
    </Root>
);

Labels.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
};
