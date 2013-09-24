var fs = require('fs'),
    path = require('path'),
    SOURCE_DIR_NAME = 'source',
    LEVEL_NAME = 'common.blocks',
    BLOCK_NAME = 'animate',
    BLOCK_PATH = path.join(LEVEL_NAME, BLOCK_NAME),
    MOD_NAME = 'type',
    MOD_DIR = '_' + MOD_NAME,
    MOD_PATH = path.join(BLOCK_PATH, MOD_DIR),
    PAGE_BLOCK_NAME = 'b-page',
    PAGE_BLOCK_PATH = path.join(LEVEL_NAME, PAGE_BLOCK_NAME);

fs.existsSync(LEVEL_NAME) || fs.mkdirSync(LEVEL_NAME);
fs.existsSync(BLOCK_PATH) || fs.mkdirSync(BLOCK_PATH);
fs.existsSync(MOD_PATH) || fs.mkdirSync(MOD_PATH);
fs.existsSync(PAGE_BLOCK_PATH) || fs.mkdirSync(PAGE_BLOCK_PATH);

var pageBlockCss = [
        '.' + PAGE_BLOCK_NAME + ' { /* Addresses a small issue in webkit: http://bit.ly/NEdoDq */',
        '    -webkit-backface-visibility: hidden;',
        '}'
    ].join('\n'),
    blockCss = [
        '.' + BLOCK_NAME + ' {',
        '    -webkit-animation-duration: 1s;',
        '       -moz-animation-duration: 1s;',
        '         -o-animation-duration: 1s;',
        '            animation-duration: 1s;',
        '    -webkit-animation-fill-mode: both;',
        '       -moz-animation-fill-mode: both;',
        '         -o-animation-fill-mode: both;',
        '            animation-fill-mode: both;',
        '}'
    ].join('\n');

fs.writeFileSync(path.join(LEVEL_NAME, PAGE_BLOCK_NAME, PAGE_BLOCK_NAME + '.css'), pageBlockCss);
fs.writeFileSync(path.join(LEVEL_NAME, BLOCK_NAME, BLOCK_NAME + '.css'), blockCss);

fs.readdir(SOURCE_DIR_NAME, function(err, list) {
    if (err) return console.log(err);

    list.forEach(function(file) {
        var fileName = file.split('.')[0],
            filePath = path.join(SOURCE_DIR_NAME, file),
            css = fs.readFileSync(filePath, 'utf8'),
            bemFileName = BLOCK_NAME + MOD_DIR + '_' + fileName,
            bemCss = css.replace('.' + fileName, '.' + bemFileName);

        fs.writeFileSync(path.join(MOD_PATH, bemFileName + '.css'), bemCss);

    });
});
