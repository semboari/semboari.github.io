var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));

require('./api/routers')(app);

var path = require('path');
app.use('/', express.static('./'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log('Listening on ' + PORT));
