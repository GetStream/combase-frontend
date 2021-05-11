import React from 'react';
import styled from 'styled-components';

import { AttachmentIcon } from '../../../icons';
import IconLabel from '../../../IconLabel';

const Root = styled.div`
    max-width: 22.5em;
    width: 100%;
`;

const Preview = styled.div`
	padding-top: .25rem;
	padding-bottom: .5rem;
    display: grid;
    grid-gap: .25rem;
    grid-template-columns: repeat(min(${({ attachmentCount }) => attachmentCount}, 2), 1fr);

    & > div {
        position: relative;
        overflow: hidden;
        z-index: 0;
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius}rem;
    }

    & > div > img {
        height:  100%;
        width: 100%;
        object-fit: cover;
    }
`;

const Fallback = styled.div`
    margin-bottom: .25rem;
`;

export const MessageAttachment = ({ attachments }) => {
    return <Root>
        <Fallback>
            {
                attachments.length > 1 ? (
                    <IconLabel $iconSize={.75} $size={.75} icon={AttachmentIcon} label="Multiple Attachments" />
                )
                : (
                    <IconLabel $iconSize={.75} $size={.75} icon={AttachmentIcon} label={`${attachments[0].type}: ${attachments[0].fallback}`} />
                )
            }
        </Fallback>
        <Preview attachmentCount={attachments.length}>
            {attachments.map(({ fallback, image_url, thumb_url, type }) => {
				return (
					<div key={image_url || thumb_url}>
						{
							type === 'image' ? (
								<img alt={fallback} src={image_url || thumb_url} />
							) : <img alt={fallback} src={thumb_url} />
						}
					</div>
				)
			})}
        </Preview>
    </Root>
};
