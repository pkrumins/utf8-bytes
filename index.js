module.exports = function (str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c >= 2048) {
            bytes.push(
                0xe0 + Math.floor(c / 64 / 64),
                0x80 + Math.floor((c - 32) / 64) % 64,
                0x80 + c % 64
            );
        }
        else if (c >= 128) {
            bytes.push(0xc0 + Math.floor(c / 64), 0x80 + c % 64);
        }
        else bytes.push(c);
    }
    return bytes;
};
