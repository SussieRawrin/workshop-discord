/* imports, TODO discord import optimization */
import { magentaBright, yellowBright } from 'chalk';
import { config } from 'dotenv';
import * as discord from 'discord.js';

/* fix variables */
config();

/* console prefix */
const prefix = `${ magentaBright('discord') }>`;

/* discord things */
const client = new discord.Client();
client.login(process.env.discord_token).catch((error) => {
  console.error(magentaBright(error));
  console.error(magentaBright('  • is "discord_token" in your .env?'));
  process.exit();
});

/**
 * this is when the bot boots
 * @event 'ready'
*/
client.once('ready', () => {
  console.info(prefix, `${ yellowBright(client.user.tag) } signed in`);
});
