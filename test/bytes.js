var bytes = require('../');
var test = require('tape');

test('some canned examples', function (t) {
    t.deepEqual(bytes('[☉,☼]'), bufArray('[☉,☼]'));
    t.deepEqual(
        bytes('\uD834\uDF06'),
        [ 240, 157, 140, 134 ]
    );
    t.deepEqual(
        bytes('\uD835\uDC01'),
        [ 240, 157, 144, 129 ]
    );
    t.end();
});

test('1-3 byte code points', function (t) {
    for (var i = 0; i < 65536; i += Math.ceil(Math.log(i + 2) / Math.log(2))) {
        var s = String.fromCharCode(i);
        var xs = bytes(s);
        if (i < 129) t.equal(xs.length, 1)
        else if (i < 0x0800) t.equal(xs.length, 2)
        else t.equal(xs.length, 3)
        t.deepEqual(xs, bufArray(s));
    }
    s = String.fromCharCode(65535);
    t.deepEqual(bytes(s), bufArray(s));
    t.end();
});

test('astral symbols', function (t) {
    for (var i = 0xd800; i <= 0xdbff; i += 8) {
        for (var j = 0xdc00; j <= 0xdfff; j += 8) {
            var s = String.fromCharCode(i, j);
            var xs = bytes(s);
            t.equal(xs.length, 4);
            t.deepEqual(xs, bufArray(s));
        }
    }
    t.end();
});

function bufArray (s) {
    return [].slice.call(Buffer(s));
}
