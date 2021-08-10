import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';

import Button from '@combase.app/ui/Button';
import Text from '@combase.app/ui/Text';

const FormikCancelButton = ({ cancelMsg, label }) => {
	const formik = useFormikContext();

	const handleCancel = useCallback(() => {
		formik.resetForm();
		toast.dark(cancelMsg);
	}, [formik]);

	return formik.dirty ? (
		<Button color="altText" variant="flat" onClick={handleCancel}>
			<Text color="altText">{label}</Text>
		</Button>
	) : null;
};

FormikCancelButton.defaultProps = {
	cancelMsg: 'Changes reset.',
	label: 'Cancel'
};

export default FormikCancelButton;