export const dataTransferItemsHaveFiles = items => {
    if (!items || !items.length) {
        return false;
    }

    return Object.values(items).some(item => item?.kind === 'file' || item.type === 'text/html');
};

const getFileLikes = items => {
    const fileLikes = [];

    // eslint-disable-next-line no-unused-vars
    for (const item of items) {
        if (item.kind === 'file') {
            const file = item.getAsFile();

            if (file) {
                fileLikes.push(file);
            }
        }
    }

    return fileLikes;
};

const getImageSource = async (fileLikes, src) => {
    let res;

    try {
        res = await fetch(src);
    } catch (error) {
        return;
    }

    const contentType = res.headers.get('Content-type') || 'application/octet-stream';
    const buf = await res.arrayBuffer();
    const blob = new Blob([buf], { type: contentType });

    fileLikes.push(blob);
};

const extractImageSources = s => {
    const imageTags = new DOMParser().parseFromString(s, 'text/html').querySelectorAll('img');

    return Array.from(imageTags, tag => tag.src).filter(tag => tag);
};

export const dataTransferItemsToFiles = async items => {
    if (!items || !items.length) {
        return [];
    }

    // If there are files inside the DataTransferItem prefer those
    const fileLikes = getFileLikes(items);

    if (fileLikes.length) {
        return fileLikes;
    }

    // Otherwise extract images from html
    const blobPromises = [];

    // eslint-disable-next-line no-unused-vars
    for (const item of items) {
        if (item.type === 'text/html') {
            blobPromises.push(
                new Promise(accept => {
                    item.getAsString(async s => {
                        const imagePromises = extractImageSources(s).map(src => getImageSource(fileLikes, src));

                        await Promise.all(imagePromises);
                        accept();
                    });
                })
            );
        }
    }

    await Promise.all(blobPromises);

    return fileLikes;
};

export const getAttachmentTypeFromMime = mime => {
    if (mime.includes('video/')) return 'media';

    if (mime.includes('audio/')) return 'audio';

    return 'file';
};
