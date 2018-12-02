const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 
  message.delete()
  let embed = new Discord.RichEmbed()
    .addField('Administration :', 'f!annonce, f!sondage')
    .addField('Modération :', 'f!clear')
    .addField('Statistiques :', 'f!fortnite')
    .addField('Fun :', 'f!8ball')
    .addField('Informations :', 'f!help')
    .setColor("#00BFFF")
        
    message.channel.send(embed)
}

module.exports.help = {
  name: "help"
}
