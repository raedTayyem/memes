function fbUpload() {
    href = gElCanvas.toDataURL("image/png");
    gElCanvas.toBlob(function (blob) {
        href = URL.createObjectURL(blob);
        console.log(blob);
        console.log(href); // this line should be here
        window.location = `https: //www.facebook.com/sharer/sharer.php?u=${href}`
    }, 'image/png');
}