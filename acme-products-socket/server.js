'use strict';

const app = require('express')();
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const socketio = require('socket.io');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure( 'views', { noCache: true } );

let server = app.listen(port, () => {
  console.log(chalk.bold(chalk.yellow(`Server listening on port ${port}`)));
});

const io = socketio.listen(server);

app.use( '/', require('./routes')(io));

app.get( '/', (req, res) => {
  res.render('index');
});

app.use( req => {
  console.log(req.method, req.url, 404);
});
