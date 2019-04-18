var forever = require('forever-monitor');

var child = new (forever.Monitor)('dicetiny.js', {
  'silent': false,
  'pidFile': './dicetiny.pid',
  'logFile': './dicetiny.log',
  'outFile': './dicetiny.out',
  'errFile': './dicetiny.err',
  'args': []
});

child.on('restart', function() {
  console.log('Bot was restarted by forever.js');
});

child.on('exit:code', function(code) {
  console.error('Script exited with code ' + code);
})

child.start();
