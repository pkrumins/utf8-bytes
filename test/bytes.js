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

test('all the code points', function (t) {
    for (var i = 0; i < 65536; i += Math.ceil(Math.log(i + 2) / Math.log(2))) {
        var s = String.fromCharCode(i);
        t.deepEqual(bytes(s), bufArray(s));
    }
    s = String.fromCharCode(65535);
    t.deepEqual(bytes(s), bufArray(s));
    t.end();
});

function bufArray (s) {
    return [].slice.call(Buffer(s));
}
