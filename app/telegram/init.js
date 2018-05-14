import {api, server} from "../config/telegram";
import MTProto from "telegram-mtproto";
const { Storage } = require('mtproto-storage-fs');

const app = {
  storage: new Storage('./storage.json')
};

const telegram = MTProto({ server, api, app });

module.exports = {
  telegram,
  app
};