'use strict';

var spawn = require('child_process').spawn;

var path = require('path');
var chalk = require('chalk');
var runSequence = require('run-sequence');

function Server(index) {
  this.index = index;

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {
    data = (data + '').trim().toLowerCase();
    if (data === 'rs')
      this.restart();
  }.bind(this));
}

Server.prototype.start = function() {
  this.listening = false;

  console.log(chalk.gray('starting server…'));

  var stdio = [process.stdin, 'pipe', process.stderr];
  console.log(path.resolve(this.index));
  this.instance = spawn('node', ['--debug', path.resolve(this.index)], {stdio: stdio});

  console.log(chalk.green('server started') + chalk.gray(' (' + this.instance.pid + ')'));
  console.log(chalk.yellow('to restart at any time, enter `rs`'));

  process.stdin.resume();

  this.instance.on('close', function() {
    console.log(chalk.red('server closed') + chalk.gray(' (' + this.instance.pid + ')'));
    this.instance = null;
    if (this.listening)
      this.start();
  }.bind(this));

  this.instance.stdout.pipe(process.stdout);
};

Server.prototype.restart = function() {
  if (!this.instance) {
    return this.start();
  }

  console.log(chalk.gray('restarting server… (' + this.instance.pid + ')'));
  this.instance.kill('SIGTERM');
};

module.exports = Server;
