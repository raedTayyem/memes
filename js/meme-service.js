'use strict';

const KEY = 'theMemes';

var gMemes = _createMemes();
var gFilterBy = 'all';



function removeMeme(memeId) {
    const idx = gMemes.findIndex(meme => meme.id === memeId)
    gMemes.splice(idx, 1);
    _saveMemesToStorage()

}

function addMeme(txt) {
    const meme = _createMeme(txt);
    gMemes.unshift(meme);
    _saveMemesToStorage()
}


function toggleMeme(memeId) {
    const meme  = gMemes.find(meme => meme.id === memeId)
    meme.isDone = !meme.isDone;
    _saveMemesToStorage()
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function getTotalCount() {
    return gMemes.length
}
function getActiveCount() {
    const activeMemes = gMemes.filter(meme => !meme.isDone)
    return activeMemes.length;
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)
}


function _createMemes() {

    var memes = loadFromStorage(KEY)
    if (memes && memes.length) return memes;

    memes = [];
    memes.push(_createMeme('I never eat Falafel'),20)
    memes.push(_createMeme('Stay at home'))
    memes.push(_createMeme('Learn to code'))
    
    saveToStorage(KEY, memes)
    
    return memes;
}

function _createMeme(txt,size) {
    return {
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red',
        img: gImgs[0].url
    }
}

function _createImg(id,url) {
    return {
        id: id,
        url: './img/meme-imgs (square)/1.jpg',
        keywords: ['happy']
    }
}


function makeId() {
    id++;
    return id;
}

