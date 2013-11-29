var bytes = require('../');
var test = require('tape');

test('some canned examples', function (t) {
    t.deepEqual(bytes('[☉,☼]'), Buffer('[☉,☼]').toJSON());
    t.end();
});
