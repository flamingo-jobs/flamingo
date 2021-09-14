const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/png";
const QUALITY = 0.7;

export const imageOptimizer = (file) => {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onload = function () {
        URL.revokeObjectURL(this.src);
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
            (blob) => {
                return blob
            },
            MIME_TYPE,
            QUALITY
        );

    }
}

function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}