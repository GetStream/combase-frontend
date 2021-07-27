import React, { forwardRef, useCallback, useRef, useState }from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Spinner from '@combase.app/ui/Spinner';
import useSharedRef from '@combase.app/ui/hooks/useSharedRef';

import { GET_UPLOAD_CREDENTIALS } from 'apollo/operations';

const Root = styled(Box)`
	overflow: hidden;

	& input[type="file"] {
		display: none;
	}
`;

const Loading = styled(Box)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.black, 0.64)};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AvatarInput = forwardRef(({ borderRadius, name, onChange, size, src }, ref) => {
	const [uploading, setUploading] = useState();
	const internalRef = useRef();
	const inputRef = useSharedRef(undefined, [internalRef, ref]);

	const { data } = useQuery(GET_UPLOAD_CREDENTIALS);
	
	const me = data?.me;
	const stream = data?.organization?.stream;

	const handleUpload = useCallback(async ({ target }) => {
		try {
			setUploading(true);
			const [file] = target.files;

			const body = new FormData();
			body.append('file', file);

			const res = await fetch(`https://us-east-api.stream-io-api.com/api/v1.0/images/?api_key=${stream.key}`, {
				method: 'POST',
				mode: "cors",
				headers: {
					'Authorization': me.streamToken,
					'Stream-Auth-Type': "jwt",
				},
				credentials: 'omit',
				body,
			});

			const data = await res.json();
			
			onChange(data.file)
			setUploading(false);
		} catch (error) {
			console.error(error.message);
		}
	}, [me, stream, onChange]);

	return (
		<Root borderRadius={borderRadius}>
			<input ref={inputRef} type="file" onChange={handleUpload} />
			<Avatar 
				variant={null} 
				borderRadius={borderRadius} 
				src={src} 
				name={name} 
				size={size} 
			/>
			{
				uploading ? (
					<Loading>
						<Spinner color="white" />
					</Loading>
				) : null
			}
		</Root>
	);
});

AvatarInput.defaultProps = {
	borderRadius: 7,
}

export default AvatarInput;