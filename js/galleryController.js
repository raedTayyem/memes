'use strict';

var gElCanvas;
var gCtx;
var mainImg;
var gMeme;
var gFlag = false;
var dot_flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var gInput;
var gSelectedLine = 0;
var gHighlight;


function onInit() {
    createGallery();

    gElCanvas = document.querySelector('.myCanvas');
    gCtx = gElCanvas.getContext("2d");
    if (window.innerWidth < '500') {
        gCtx.canvas.width = window.innerWidth - '2';
        gCtx.canvas.height = window.innerWidth - '2';
    } else if (window.innerWidth < '760') {
        gCtx.canvas.width = '450';
        gCtx.canvas.height = '450';
    } else {
        gCtx.canvas.width = '500';
        gCtx.canvas.height = '500';
    }


    gElCanvas.onmousedown = myDown;
    gElCanvas.onmouseup = myUp;


    gHighlight = true;
    var source = document.querySelector('.textChange');
    source.addEventListener('input', onChangeTxt);


}



function onChooseMeme(src) {
    document.querySelector('.memeGallery').style.display = "none";;
    document.querySelector('.generator').style.display = "flex";;
    var elem = document.querySelector('img');;
    elem.remove();
    mainImg = src;
    drawImg()
    renderMeme()
    onResize()
}

function renderImg(src) {

}

function renderMeme() {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I never eat Falafel',
            size: 30,
            align: 'left',
            color: 'white',
            positionY: 50,
            positionX: gCtx.canvas.width / 2,
            selected: true,
            centerAlign: true,
            rightAlign: false
        }, {
            txt: 'I never Falafel',
            size: 30,
            align: 'left',
            color: 'white',
            positionY: gCtx.canvas.height - 50,
            positionX: gCtx.canvas.width / 2,
            selected: false,
            centerAlign: true,
            rightAlign: false
        }]
    }
}


function drawImg() {
    // clear();
    var img = new Image()
    img.src = mainImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
    }
}

function drawText() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var positionX = gMeme.lines[i].positionX;
        var positionY = gMeme.lines[i].positionY;
        var txtSize = gMeme.lines[i].size;
        var txtColor = gMeme.lines[i].color;
        var txt = gMeme.lines[i].txt;
        gCtx.font = `${txtSize}px IMPACT`;
        var width = gCtx.measureText(txt).width;

        if (gMeme.lines[i].centerAlign) {
            positionX -= width / 2
        } else if (gMeme.lines[i].rightAlign) {
            positionX -= width
        }

        if (gMeme.lines[i].selected && gHighlight) {
            gCtx.fillStyle = 'RGBA(255, 255, 255, 0.5)';
            gCtx.fillRect(positionX - 20,
                (positionY - txtSize - 5), (width + 40), parseInt(gCtx.font, 10) + 20);
        }
        gCtx.strokeStyle = '#000';
        gCtx.lineWidth = 3;
        gCtx.strokeText(txt, positionX, positionY)
        gCtx.fillStyle = txtColor
        gCtx.fillText(txt, positionX, positionY);
    }
    document.querySelector('.textChange').value = gMeme.lines[gSelectedLine].txt;
}


function onChangeTxt() {
    var line = document.querySelector('.textChange').value;
    gMeme.lines[gSelectedLine].txt = line;
    drawImg();
}


function textSize(size) {
    gMeme.lines[gSelectedLine].size += size;
    drawImg();
}


function moveLines(move) {
    gMeme.lines[gSelectedLine].positionY += move;
    drawImg();
}

function switchLine() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].selected = false;
    }
    if (gSelectedLine === gMeme.lines.length - 1) {
        gSelectedLine = 0;
        gMeme.lines[gSelectedLine].selected = true;
    } else {
        gSelectedLine++;
        gMeme.lines[gSelectedLine].selected = true;
    }
    drawImg();
}


function onResize(){
    window.addEventListener('resize', function (event) {
    onInit();
    renderMeme();
    drawImg();
});

}

function clear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onHighlight() {
    gHighlight = document.querySelector('.Highlight').checked;
    drawImg();
}


function alignLeft() {
    gMeme.lines[gSelectedLine].positionX = 10;
    gMeme.lines[gSelectedLine].centerAlign = false;
    gMeme.lines[gSelectedLine].rightAlign = false;
    drawImg();
}

function alignCenter() {
    gMeme.lines[gSelectedLine].positionX = gCtx.canvas.width / 2;
    gMeme.lines[gSelectedLine].centerAlign = true;
    gMeme.lines[gSelectedLine].rightAlign = false;
    drawImg();
}

function alignRight() {
    gMeme.lines[gSelectedLine].positionX = gCtx.canvas.width - 10;
    gMeme.lines[gSelectedLine].centerAlign = false;
    gMeme.lines[gSelectedLine].rightAlign = true;
    drawImg();
}

function onDownload() {
    var save = document.getElementById("download");
    save.download = "image.png";
    save.href = gElCanvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

function onAddLine() {
    var meme = {
        txt: 'New Text',
        size: 30,
        align: 'left',
        color: 'white',
        positionY: gCtx.canvas.width / 2,
        positionX: gCtx.canvas.width / 2,
        selected: true,
        centerAlign: true,
        rightAlign: false
    }
    gHighlight = true;
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].selected = false;
    }
    gSelectedLine = gMeme.lines.length;
    gMeme.lines.push(meme);
    drawImg();
}


function onDelete() {
    gMeme.lines.splice(gSelectedLine, 1);
    gSelectedLine = 0;
    gMeme.lines[gSelectedLine].selected = true;
    drawImg();
}


var dragok = false;


function myMove(ev) {
    var txt = gMeme.lines[gSelectedLine]
    var x = txt.positionX;
    var y = txt.positionY;

    if (dragok) {
        x = ev.pageX - gElCanvas.offsetLeft;
        y = ev.pageY - gElCanvas.offsetTop;
        gMeme.lines[gSelectedLine].positionX = x;
        gMeme.lines[gSelectedLine].positionY = y;
        drawImg();
    }
}

function myDown(ev) {

    for (var i = 0; i < gMeme.lines.length; i++) {
        var txt = gMeme.lines[i]
        var x = txt.positionX;
        var y = txt.positionY;
        var width = gCtx.measureText(txt).width / 2 + 40;

        if (ev.pageX < x + width + gElCanvas.offsetLeft && ev.pageX > x - width +
            gElCanvas.offsetLeft && ev.pageY < y + width + gElCanvas.offsetTop &&
            ev.pageY > y - width + gElCanvas.offsetTop) {
                gSelectedLine = i;
                for (var i = 0; i < gMeme.lines.length; i++) {
                    gMeme.lines[i].selected = false;
                }
                gMeme.lines[gSelectedLine].selected = true;
                drawImg();
        }
    }

    txt = gMeme.lines[gSelectedLine]
    x = txt.positionX;
    y = txt.positionY;
    width = gCtx.measureText(txt).width / 2 + 40;


    if (ev.pageX < x + width + gElCanvas.offsetLeft && ev.pageX > x - width +
        gElCanvas.offsetLeft && ev.pageY < y + width + gElCanvas.offsetTop &&
        ev.pageY > y - width + gElCanvas.offsetTop) {
        x = ev.pageX - gElCanvas.offsetLeft;
        y = ev.pageY - gElCanvas.offsetTop;
        dragok = true;
        gElCanvas.onmousemove = myMove;
    }
}

function myUp() {
    dragok = false;
    gElCanvas.onmousemove = null;
}