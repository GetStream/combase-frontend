import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { EmptyElement } from './EmptyElement';

import { Box } from '../../../Layout';
import { Placeholder } from '../../../Placeholder';
import { useFeedsContext } from '../../../contexts/Feeds';

const Root = styled(Box)`
    width: 100%;
    &:focus {
        border: ${({ $focused, theme }) => `2px solid ${theme.colors.primary}`};
    }
    & > div {
        display: flex;
    }
    & img,
    & ${Placeholder} {
        margin: 0 auto;
        max-width: 100%;
    }
`;

const getImagePreview = file =>
    new Promise((res, rej) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = function () {
            const { width, height } = img;
            res({
                paddingTop: `calc(${height} / ${width} * 100%)`,
                width: `min(${width}px, 100%)`,
                url,
            });
        };
        img.src = url;
    });

const EditorImage = ({ attributes, children, htmlAttributes, element, ...rest }) => {
    const inputRef = useRef();
    const editor = useSlate();
    const feeds = useFeedsContext();
    const [uploading, setUploading] = useState(false);

    const { preview, url, type, id } = element;
    const focused = useFocused();
    const selected = useSelected();

    const handleChange = useCallback(async e => {
        setUploading(true);
        const [file] = e.target.files;

        const preview = await getImagePreview(file);
        editor.setNodeById(id, { preview });

        const { file: url } = await feeds.client.images.upload(file);
        editor.setNodeById(id, { url, preview: undefined });
        setUploading(false);
    }, []);

    if (!url && !preview) {
        return (
            <>
                <input onChange={handleChange} type="file" ref={inputRef} style={{ display: 'none' }} />
                <EmptyElement
                    loading={uploading}
                    label="Click to upload"
                    type={type}
                    {...attributes}
                    {...htmlAttributes}
                    onClick={() => inputRef.current?.click()}
                />
            </>
        );
    }

    return (
        <Root {...attributes} $focused={focused}>
            <Box contentEditable={false}>
                <Placeholder
                    {...htmlAttributes}
                    as={url ? 'img' : undefined}
                    placeholderWidth={preview?.width}
                    paddingTop={preview?.paddingTop}
                    src={url}
                />
            </Box>
            {children}
        </Root>
    );
};

export default EditorImage;