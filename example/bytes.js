var bytes = require('../');
console.log(bytes('[☉,☼]'));
console.log(Buffer(bytes('[☉,☼]')).toString('utf8'));
