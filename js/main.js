var gElCanvas;
var gCtx;
var gImgs;
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

    renderImg()
    renderMeme()
    renderMemes();

    gHighlight = true;
    var source = document.querySelector('.textChange');
    source.addEventListener('input', onChangeTxt);

    // gElCanvas.addEventListener("mousemove", function (ev) {
    //     findxy('move', ev)
    // }, false);
    // gElCanvas.addEventListener("mousedown", function (ev) {
    //     findxy('down', ev)
    // }, false);
    // gElCanvas.addEventListener("mouseup", function (ev) {
    //     findxy('up', ev)
    // }, false);
    // gElCanvas.addEventListener("mouseout", function (ev) {
    //     findxy('out', ev)
    // }, false);
    // gElCanvas.addEventListener("touchstart", function (ev) {
    //     ev.preventDefault();
    //     findxy('start', ev)
    // }, false);
    // gElCanvas.addEventListener("touchend", function (ev) {
    //     ev.preventDefault();
    //     findxy('end', ev)
    // }, false);
    // gElCanvas.addEventListener("touchmove", function (ev) {
    //     ev.preventDefault();
    //     findxy('touchMove', ev)
    // }, false);
}

function renderMemes() {
    var img = gImgs[0].url;
    drawImg(img);
}


function renderImg() {
    gImgs = [{
        id: 1,
        url: './img/meme-imgs (square)/1.jpg',
        keywords: ['happy']
    }];
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
            // img: gImgs[0].url,
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
            // img: gImgs[0].url,
            positionY: gCtx.canvas.height - 50,
            positionX: gCtx.canvas.width / 2,
            selected: false,
            centerAlign: true,
            rightAlign: false
        }]
    }
}



function drawImg(url) {
    var img = new Image()
    img.src = url;
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
// function changeTxt() {
//     gMeme.lines[0].txt = document.querySelector('.text').value;
//     onInit()
// }
function onChangeTxt() {
    var line = document.querySelector('.textChange').value;
    gMeme.lines[gSelectedLine].txt = line;
    renderMemes();
}

function changeImg(img) {
    gMeme.lines[gSelectedLine].img = img.src;
    onInit()
}

function textSize(size) {
    gMeme.lines[gSelectedLine].size += size;
    // debugger
    renderMemes();
}


function moveLines(move) {
    gMeme.lines[gSelectedLine].positionY += move;
    renderMemes();
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
    renderMemes();
}

// function findxy(res, ev) {
//     if (res === 'down') {
//         prevX = currX;
//         prevY = currY;
//         currX = ev.offsetX;
//         currY = ev.offsetY;
//         console.log(ev);
//         gFlag = true;
//         dot_flag = true;
//     if (dot_flag) {
//         gCtx.beginPath();
//         gCtx.fillStyle = myColor;
//         gCtx.arc(currX, currY, 40, 0, 2 * Math.PI, false);
//         gCtx.stroke();
//         dot_flag = false;
//     }
// }
// if (res === 'up' || res === "out") {
//     gFlag = false;
// }
// if (res === 'move') {
//     if (gFlag) {
//         prevX = currX;
//         prevY = currY;
//         currX = ev.clientX - gElCanvas.offsetLeft;
//         currY = ev.clientY - gElCanvas.offsetTop;
//         draw();
//     }
//     }
// }

window.addEventListener('resize', function (event) {
    onInit()
});


function onHighlight() {
    gHighlight = document.querySelector('.Highlight').checked;
    renderMemes();
}


function alignLeft() {
    gMeme.lines[gSelectedLine].positionX = 10;
    gMeme.lines[gSelectedLine].centerAlign = false;
    gMeme.lines[gSelectedLine].rightAlign = false;
    renderMemes();
}

function alignCenter() {
    gMeme.lines[gSelectedLine].positionX = gCtx.canvas.width / 2;
    gMeme.lines[gSelectedLine].centerAlign = true;
    gMeme.lines[gSelectedLine].rightAlign = false;
    renderMemes();
}

function alignRight() {
    gMeme.lines[gSelectedLine].positionX = gCtx.canvas.width - 10;
    gMeme.lines[gSelectedLine].centerAlign = false;
    gMeme.lines[gSelectedLine].rightAlign = true;
    renderMemes();
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
        // img: gImgs[0].url,
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
    renderMemes();
}


function onDelete(){
    gMeme.lines.splice(gSelectedLine, 1);
    gSelectedLine = 0;
    gMeme.lines[gSelectedLine].selected = true;
    renderMemes();
}