import { telegram, app } from './init';

async function getUser(username){
  const query = await telegram('contacts.resolveUsername', {
    username    : username,
  });

  return query.users[0]
}



module.exports = { getUser };