import { forwardRef, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';
import styled from 'styled-components';
import { layout } from '@combase.app/styles';
import Cropper from 'react-easy-crop';

import { AddImageIcon, Button, Box, Card, Container, Heading, Text, useFeedsContext } from '@combase.app/ui';

const Root = styled(Card)`
    width: ${({ theme: { sizes } }) => sizes[16]};

    button {
        width: 100%;
    }
`;

const IconBubble = styled(Box)`
    ${layout};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(Box)`
    ${layout};
    display: grid;
    padding: ${({ theme: { space } }) => space[2]};
    grid-gap: ${({ theme: { space } }) => space[2]};
    grid-template-columns: 1fr 1fr;
`;

const DropzoneWrapper = styled(Container)`
    ${layout};
    & > * {
        width: 100%;
        height: 100;
    }
`;

function resizeCrop(src, { height, width, x, y }) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // crop it top center
    context.drawImage(src, x, y, width, height, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 90);
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

const UpdateAvatarDialog = forwardRef(({ file, name, onSubmit, onClose }, ref) => {
    const { data } = useQuery(GET_CURRENT_USER);
    const me = data?.me;

    const initialValues = useMemo(
        () => ({
            _id: me?._id,
            record: {
                avatar: me?.avatar,
            },
        }),
        [me]
    );

    const feeds = useFeedsContext();
    const cropperRef = useRef();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [uploading, setUploading] = useState(false);

    const handleSubmit = useCallback(
        async values => {
            try {
                setUploading(true);

                const { file:value } = await feeds.client.images.upload(values.record.avatar);
                
				onSubmit({
					target: {
						name,
						value,
					}
				})

                setUploading(false);
                onClose();
            } catch (error) {
                setUploading(false);
                console.error(error.message);
            }
        },
        [name, onClose, onSubmit, feeds]
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: handleSubmit,
    });

    const handleCropComplete = useCallback((crop, cropPixels) => {
        const cropped = resizeCrop(cropperRef.current.imageRef, cropPixels);
        formik.setFieldValue('record.avatar', dataURLtoFile(cropped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
        () => () => {
            if (file) {
                URL.revokeObjectURL(file.preview);
            }
        },
        [file]
    );

    return (
        <Root boxShadow={8} padding={1} role="dialog" ref={ref}>
            <Box padding={4}>
                <IconBubble backgroundColor="primaryA.8" borderRadius="50%" marginBottom={4} size={5}>
                    <AddImageIcon color="primary" size={4} />
                </IconBubble>
                <Heading fontSize={6} lineHeight={6}>
                    Update Avatar
                </Heading>
                <Text color="altText" marginTop={1} fontSize={3} fontWeight="600" lineHeight={5}>
                    Set a new avatar image for your profile.
                </Text>
            </Box>
            <DropzoneWrapper gutters={!file?.preview} height={15} variant="fluid">
			<Cropper
				image={file?.preview}
				crop={crop}
				zoom={zoom}
				aspect={1 / 1}
				ref={cropperRef}
				onCropChange={setCrop}
				onCropComplete={handleCropComplete}
				onZoomChange={setZoom}
				style={{ width: '100%', height: '100%' }}
			/>
            </DropzoneWrapper>
            <Footer marginTop={4}>
                <Button color="error" variant="flat" size="sm" onClick={onClose}>
                    <Text>Cancel</Text>
                </Button>
                <Button
                    disabled={!formik.dirty || !formik.isValid}
                    loading={uploading}
                    type="submit"
                    size="sm"
                    onClick={formik.handleSubmit}
                >
                    <Text>Confirm</Text>
                </Button>
            </Footer>
        </Root>
    );
});


export default UpdateAvatarDialog;
