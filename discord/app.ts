/* imports, TODO discord import optimization */
import { magentaBright, yellowBright } from 'chalk';
import { config } from 'dotenv';
import { Client } from 'discord.js';
import { WorkshopCodeParser } from './package';

const { parse } = new WorkshopCodeParser();

/* fix variables */
config();

/* terminal prefix */
const prefix = `${ magentaBright('discord') }>`;

/* discord things */
const client = new Client();
client.login(process.env.discord_token)
  .catch((error) => {
    console.error(`${ magentaBright(error) }\n'  • is ${ magentaBright('"discord_token"') } in your .env?`);
    process.exit();
  });

/* this is when the bot boots */
client.once('ready', () => console.info(prefix, `${ yellowBright(client.user.tag) } signed in`));

/* view messages for workshop codes */
client.on('message', async (message) => parse(message));
