const { hint_solver, predict_pokemon, getRandomCharacters, owner_id, sleep, getRandomSleepTime, getRandomWords } = require('../functions.js');
const { Client } = require('discord.js-selfbot-v13');
const prefix = process.env.PREFIX_1;
const client = new Client({
  checkUpdate: false,
});
const token = process.env['TOKEN_69']


function startBot() {
  const times = getRandomSleepTime()

  client.on('ready', async () => {
    console.log(`Bot 1 is logged in as ${client.user.username}`);
    await spammer("start")
  });

  client.on('messageCreate', async (message) => {
    if (message.author.id === owner_id) {
      const content = message.content.toLowerCase();
      if (content.startsWith(`${prefix}say`)) {
        await sleep(1000);
        await message.channel.send(content.slice(`${prefix}say`.length));
      } else if (content.startsWith(`${prefix}help`)) {
        await sleep(1000);
        await message.channel.send(`Prefix: ${prefix}\n- __List of Commands:__\n - \`${prefix}say ( msg )\`- Duplicate your msg\n - \`${prefix}start_spam\` - Start Spamming\n - \`${prefix}stop_spam\` - Stop Spamming`);
      } else if (content.startsWith(`${prefix}start_spam`)) {
        await sleep(1000);
        await message.channel.send("Starting...");
        await spammer("start");
      } else if (content.startsWith(`${prefix}stop_spam`)) {
        await sleep(1000);
        await message.channel.send("Stopping...");
        await spammer("stop");
      }
    }
    if (message.author.id === '716390085896962058' && message.channel.name.includes('spawn')) {
      if (message.embeds.length > 0) {
        const embed = message.embeds[0].toJSON();
        const title = embed.title;
        if (title.includes('pokémon has appeared')) {
          const imageLink = embed.image.url;
          await sleep(times);
          const pokeName = await predict_pokemon(imageLink);
          await message.channel.send(`<@716390085896962058> c ${pokeName.toLowerCase()}`);

          const filter = (response) => {
            return response.author.id === "716390085896962058" && response.channel.id === message.channel.id && (response.content.includes('Congratulations') || response.content.includes('That is the wrong pokémon!'));
          };

          try {
            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 6000 });
            if (collected.size === 0) {
              // No response received within 3 seconds, send "hint 3"
              message.channel.send(await getRandomWords());
            } else {
              const collectedMessage = collected.first();
              if (collectedMessage.content.includes('That is the wrong pokémon!')) {
                await sleep(times)
                message.channel.send('<@716390085896962058> h');
              }
            }
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        }
      } else if (message.content.includes('Whoa there. Please tell us you\'re human!')) {
        await spammer('stop');
        const content = `<@${owner_id}>, Please Verify: ${message.content.substring('Whoa there. Please tell us you\'re human!'.length)}`;
        await message.channel.send(content);
      } else if (message.content.includes('The pokémon is')) {
        let s = message.content.split(" is ")[1].replace(".", "").replace(/\\/g, "").toLowerCase();
        const x = hint_solver(s);
        const first_options = x;
        if (first_options) {
          await sleep(times);
          await message.channel.send(`<@716390085896962058> c ${first_options[0]}`);
          const filter = (response) => {
            return response.author.id === "716390085896962058" && response.channel.id === message.channel.id && (response.content.includes('Congratulations') || response.content.includes('That is the wrong pokémon!'));
          };

          try {
            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 6000 });
            if (collected.size === 0) {
              // No response received within 3 seconds, send "hint 3"
              message.channel.send(await getRandomWords());
            } else {
              const collectedMessage = collected.first();
              if (collectedMessage.content.includes('That is the wrong pokémon!')) {
                await sleep(times)
                message.channel.send(`<@716390085896962058> c ${first_options[1]}`);
              }
            }
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        }
      }
    }
  });





  async function spammer(input) {
    global.spammer_running;
    const spam_channel = client.guilds.cache
      .flatMap(guild => guild.channels.cache)
      .find(channel => channel.name === "spam");

    if (input === "start") {
      spammer_running = true;
      if (spam_channel) {
        await spam_channel.send("Spammer Started");
      }

      while (spammer_running) {
        await new Promise(resolve => setTimeout(resolve, 2550 + Math.sin(Date.now()) * 500));
        if (spam_channel) {
          await spam_channel.send(getRandomCharacters());
        }
      }
    } else if (input === "stop") {
      spammer_running = false;
      if (spam_channel) {
        return await spam_channel.send("Spammer Stopped!");
      }
    } else {
      return;
    }
  }



  client.login(token);
}

module.exports = {
  startBot,
};
