import React,{ forwardRef, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { Avatar, Box, Modal, useSharedRef } from '@combase.app/ui';
import { UpdateAvatarDialog } from 'components/modals';

const Root = styled(Box)`
	position: relative;
	border-radius: ${({ theme }) => theme.radii.squircle};
	overflow: hidden;
	cursor: pointer;

	&:hover {
		&::after {
			content: 'EDIT';
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.black, .64)};
		}
	}
`;

const AvatarInput = forwardRef(({ className, name, onChange, value, ...props}, ref) => {
	const [avatarFile, setAvatarFile] = useState(null);

	const internalRef = useRef();
	const inputRef = useSharedRef(undefined, [internalRef, ref]);

	const handleAvatarChange = useCallback(e => {
		let [newFile] = e.target.files;
        if (newFile) {
			setAvatarFile({
				...newFile,
                preview: URL.createObjectURL(newFile),
            });
        }
    }, []);

	return (
		<Root className={className} size={props.size || 8} onClick={() => inputRef.current.click()}>
			<Avatar 
				{...props}
				src={value} 
			/>
			<input ref={inputRef} onChange={handleAvatarChange} type="file" style={{display: 'none'}} />
			<Modal
				open={!!avatarFile} 
				file={avatarFile} 
				name={name}
				onSubmit={onChange}
				onClose={() => setAvatarFile(null)} 
				component={UpdateAvatarDialog} 
			/>
		</Root>
	);
});

export default AvatarInput;
