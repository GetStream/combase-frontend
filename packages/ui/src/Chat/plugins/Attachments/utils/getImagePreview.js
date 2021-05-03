export const getImagePreview = file =>
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
