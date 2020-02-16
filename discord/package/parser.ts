import { Message, RichEmbed } from 'discord.js';
import axios from 'axios';
import https from 'https';
import fs from 'fs';
import { newPreviewImage } from '../animations';

export class WorkshopCodeParser {

  /* rainbow index */
  private index = 0;

  /* rainbow colors */
  private colors = {
    purple: '#f2a2e8',
    red: '#fea3aa',
    orange: '#f8b88b',
    yellow: '#fadf84',
    green: '#baed91',
    blue: '#b2cefe',
  };

  /* tired emojis */
  private sadEmojis = [':sob:', ':cold_sweat:', ':cold_face:', ':persevere:', ':pensive:'];

  /* in progress */
  private queued: Array<string> = [];

  /**
   * will attempt to reply with an embed if a code is typed
   * @param message discord message
  */
  parse = async (message: Message) => {

    /* /(?<=\(\()[A-Z0-9]{5}(?=\)\))/i: matches the first ((anyth)) and (not including the (())) */
    const matches = message.content.match(/(?<=\(\(|{{)[A-Z0-9]{5}(?=\)\)|}})/i/* g */);

    /* if there are no codes in the message, stop here */
    if (!matches) return;
    const code = matches[0].toLowerCase();
    if (this.queued.includes(code)) return;

    /* tell the camera to not allow this code any more */
    this.queued.push(code);

    /* view activity */
    /* code will be the first one in a message (in lowercase) */
    await message.channel.startTyping();
    console.info(`matched ${ code } from ${ message.author.tag } in ${ message.channel }`);
    const embed = new RichEmbed();

    /* attempt to find the code on https://api.workshopcodes.com/ */
    let data;
    try {
      data = await axios({
        url: process.env.query_prefix + code,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      data = data.data;
    } catch (error) {

      /* pick a sad emoji */
      const sadEmoji = this.sadEmojis[Math.floor(Math.random() * this.sadEmojis.length)];

      /* 404 message */
      embed
        .setTitle('Not Found')
        .setDescription(`Sorry, i couldn't find any posts with the code **${ code }** ${ sadEmoji }`)
        .setColor('#fea3aa');

      /* add a no emoji on their message */
      await message.react('🚫');

      console.error(404);
      await message.channel.send(embed);
      return;
    }

    /* pick a rainbow color */
    const color = Object.values(this.colors)[this.index % Object.values(this.colors).length];
    this.index += 1;

    /* take a camera shot */
    const image = await newPreviewImage({ code, color });
    if (image) await embed.setImage(`attachment://${ code }.png`);

    /* write mail */
    const date = new Date(data.updated);
    embed
      .addField('Newest Version', data.content.newestCode.code.toUpperCase(), true)
      .addField('Heart Count', `${ data.hearts.length } hearts`, true)

      .setTitle(data.content.title)
      .setDescription(data.content.description)

      /* TODO make this route */
      .setURL(`https://workshopcodes.com/code/${ code }`)
      .setColor(color)
      .setAuthor(
        data.owner.battletag,
        /* TODO icondata in players :C */
        'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f0a757c0b3ef4bcf7d65a142685281701d7813f0497b20be22903a94d8fcb3d3.png',
        `https://workshopcodes.com/profile/${ data.owner.battletag.replace('#', '@') }`,
      )
      .setFooter(`workshopcodes.com/${ code }`)
      .setTimestamp(date);

    /* if there was no image, don't attatch one */
    if (!image) {
      await message.channel.send(embed);
      return;
    }

    /* attach image, (discord will save it) */
    await message.channel.send({
      embed,
      files: [{
        attachment: image,
        name: `${ code }.png`,
      }],
    });

    /* delete image */
    await fs.unlinkSync(image);
    await message.channel.stopTyping(true);
    this.queued = this.queued.filter((item) => item !== code);
  };
}
