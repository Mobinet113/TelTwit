import { inputField } from './fixtures';
import { telegram, app } from './init';
import {settings, api} from '../config/telegram';
import chalk from 'chalk';

async function login(){
  
  console.log("Logging in to Telegram");
  console.log("Phone: ", settings.phone);

  try {

    /**
     * Request the Auth code
     */
    const { phone_code_hash, phone_registered } = await telegram('auth.sendCode', {
      phone_number    : settings.phone,
      current_number  : false,
      api_id          : api.api_id,
      sms_type        : 5,
      api_hash        : settings.api_hash
    });

    console.log( chalk.yellow( "Enter your auth code" ) );
    const code = await inputField('code');

    if ( ! phone_registered) {

      console.log( chalk.blue( "User not found, registering new user from config details" ) );

      console.log("Phone Hash", phone_code_hash);
      console.log("Phone Code", code);
      console.log("First Name", settings.firstName);
      console.log("Last Name", settings.lastName);

      const {user} = await telegram('auth.signUp', {
        phone_number    : settings.phone,
        phone_code_hash : phone_code_hash,
        phone_code      : code,
        first_name      : settings.firstName,
        last_name       : settings.lastName
      });

      console.log( chalk.blue ('Account registered and signed as ' + user ) );

    } else {

      const {user} = await telegram('auth.signIn', {
        phone_number      : settings.phone,
        phone_code_hash   : phone_code_hash,
        phone_code        : code
      });

      console.log('signed in as ', user);
    }

    app.storage.set('signedin', true);

  } catch ( error ) {

    console.log(chalk.red ( "Telegram Login" + error ) );

  }

}

module.exports = login;