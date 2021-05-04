import { useCallback, useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useToasts } from 'react-toast-notifications';
import debounce from 'just-debounce-it';

export const useFormikAutosave = (dMs = 1500) => {
	const mounted = useRef();
	const formik = useFormikContext();
	const { addToast, removeAllToasts } = useToasts();

	const debouncedSubmit = useCallback(
		debounce(() => {
			addToast('Saving changes...', {
				appearance: 'info',
				autoDismiss: true,
			})
			return formik.submitForm()
		}, dMs),
		[dMs, formik.submitForm]
	);

	useEffect(() => {
		if (mounted.current) {
			debouncedSubmit();
		} else {
			mounted.current = true;
		}
	}, [debouncedSubmit, formik.values]);

	// Clear any toasts on unmount.
	useEffect(() => {
		return removeAllToasts
	}, []);
};