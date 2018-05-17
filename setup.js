'use strict';
const chalk = require('chalk');
const fs = require('fs');

if ( fs.existsSync('.env')) {
  console.log( chalk.blue('.env file already exists') );

} else {
  console.log( chalk.blue('Creating .env file from .sample-env') );

  fs.createReadStream('.sample-env')
    .pipe(fs.createWriteStream('.env'));
}