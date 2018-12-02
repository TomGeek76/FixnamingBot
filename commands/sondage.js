const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 

  if(!message.member.hasPermission("MANAGE_MESSAGES")){
    var embed = new Discord.RichEmbed()
      .setDescription(`:x: Vous n'avez pas les permissions nécessaires pour effectuer cette commande.`)
      .setColor('0xCC0000')
      return message.channel.send(embed);
  }

  let question = args.join(" ");

  if(!args[0]){
    var embed = new Discord.RichEmbed()
      .setDescription(`:x: Merci de mettre au moins 1 mots.`)
      .setColor('0xCC0000')
    return message.channel.send(embed);
  }

  var sondage = new Discord.RichEmbed()
    .setDescription(':bar_chart: Sondage')
    .addField(question, 'Répondre avec :white_check_mark: ou :x: !')
    .setFooter('Fixnaming ', 'https://cdn.discordapp.com/attachments/491324786165678140/518854391063642189/Logo_FixNaming.jpg')
    .setTimestamp(new Date())
    .setColor('#00BFFF')
  message.channel.send(sondage)
  .then(function (message) {
    message.react('✅')
    message.react('❌')
  })
  message.delete()
}

module.exports.help = {
  name: "sondage"
}
