const Discord   = require('discord.js');
const botconfig    = require('../botconfig.json');
const Fortnite  = require("fortnite");
const ft = new Fortnite(process.env.FORTNITE);

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 
  message.delete();
  let username = args[0];
  let gamemode = args[1];
  let platform = args[2] || "pc";

  if(!username && !platform) return message.reply("Usage: f!fortnite <nom> <solo | duo | squad | lifetime> <pc | ps4 | xbox>");

  if(gamemode != 'solo' && gamemode != 'duo' && gamemode != 'squad' && gamemode != 'lifetime') return message.reply("Usage: s!fortnite <nom> <solo | duo | squad | lifetime> <pc | ps4 | xbox>");

  let data = ft.user(username, platform).then(data => {
    
    let stats = data.stats;
    
    if(gamemode === 'solo'){
      let solostats = stats.solo;

      let score = solostats.score;
      let kd = solostats.kd;
      let match = solostats.matches;

      let kills = solostats.kills;
      let kills_per_match = solostats.kills_per_match;
      let wins = solostats.wins;

      let top3 = solostats.top_3;
      let top5 = solostats.top_5;
      let top25 = solostats.top_25;

      let embed = new Discord.RichEmbed()
        .setAuthor(data.username + " | Fortnite Stats Solo")
        .setColor("#ff6a00")

        .addField('Score', score, true)
        .addField('Kills / Mort (KD)', kd, true)
        .addField('Match Joués', match, true)

        .addField('Kills', kills, true)
        .addField("Kills Par Match", kills_per_match, true)
        .addField('Wins', wins, true)

        .addField('Top 3', top3, true)
        .addField('Top 5', top5, true)
        .addField('Top 25', top25, true)

        message.channel.send(embed);

    } else if(gamemode === 'duo') {
      let duostats = stats.duo;

      let score = duostats.score;
      let kd = duostats.kd;
      let match = duostats.matches;

      let kills = duostats.kills;
      let kills_per_match = duostats.kills_per_match;
      let wins = duostats.wins;

      let top3 = duostats.top_3;
      let top5 = duostats.top_5;
      let top25 = duostats.top_25;

      let embed = new Discord.RichEmbed()
        .setAuthor(data.username + " Fortnite Stats Duo")
        .setColor("#ff6a00")

        .addField('Score', score, true)
        .addField('Kills / Mort (KD)', kd, true)
        .addField('Match Joués', match, true)

        .addField('Kills', kills, true)
        .addField("Kills Par Match", kills_per_match, true)
        .addField('Wins', wins, true)

        .addField('Top 3', top3, true)
        .addField('Top 5', top5, true)
        .addField('Top 25', top25, true)

        message.channel.send(embed);
    } else if(gamemode === 'squad') {
      let squadstats = stats.squad;

      let score = squadstats.score;
      let kd = squadstats.kd;
      let match = squadstats.matches;

      let kills = squadstats.kills;
      let kills_per_match = squadstats.kills_per_match;
      let wins = squadstats.wins;

      let top3 = squadstats.top_3;
      let top5 = squadstats.top_5;
      let top25 = squadstats.top_25;

      let embed = new Discord.RichEmbed()
        .setAuthor(data.username + " Fortnite Stats Squad")
        .setColor("#ff6a00")

        .addField('Score', score, true)
        .addField('Kills / Mort (KD)', kd, true)
        .addField('Match Joués', match, true)

        .addField('Kills', kills, true)
        .addField("Kills Par Match", kills_per_match, true)
        .addField('Wins', wins, true)

        .addField('Top 3', top3, true)
        .addField('Top 5', top5, true)
        .addField('Top 25', top25, true)

        message.channel.send(embed);
    } else {
      let lifetime = stats.lifetime;
        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];
        let top3 = lifetime[1]['Top 3s'];
        let top5 = lifetime[0]['Top 5s'];
        let top25 = lifetime[5]['Top 25s'];
      


      let embed = new Discord.RichEmbed()
        .setAuthor(data.username + " Fortnite Stats")
        .setColor("#ff6a00")
        .addField('Score', score, true)
        .addField('Wins', wins, true)
        .addField('Wins %', winper, true)

        .addField('Matches Joués', mplayed, true)
        .addField("Kills", kills, true)
        .addField('Kill / Mort (KD)', kd, true)

        .addField('Top 3', top3, true)
        .addField('Top 5', top5, true)
        .addField('Top 25', top25, true)

        message.channel.send(embed);
    }


  }).catch(e => {
    var embed = new Discord.RichEmbed()
        .setDescription(`:x: Nom d'utilisateur introuvable dans la base de données.`)
        .setColor('0xCC0000')
      message.channel.send(embed)
  });
}

module.exports.help = {
  name: "fortnite"
}
