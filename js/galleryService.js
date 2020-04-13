'use strict';

var gImgs = []

function createGallery() {
    for (var i = 1; i < 18; i++) {
        var img = {
            id: i,
            url: `./img/meme-imgs (square)/${i}.jpg`,
        }
        let elGallery = document.querySelector('.memeGallery');
        elGallery.innerHTML +=`<img src='${img.url}' width="200" height="200" onclick="onChooseMeme(this.src)"/> ` ;
        gImgs.push(img);
    }
}
