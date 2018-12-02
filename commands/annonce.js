const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 

  message.delete()
  if(!message.member.hasPermission("ADMINISTRATOR")){
    var embed = new Discord.RichEmbed()
        .setDescription(`:x: Vous n'avez pas les permissions nécessaires pour effectuer cette commande.`)
        .setColor('0xCC0000')
    return message.channel.send({embed});
  }

  if(!args[0]){
    var embed = new Discord.RichEmbed()
      .setDescription(`:x: Merci de mettre au moins 1 mots.`)
      .setColor('0xCC0000')
    return message.channel.send(embed);
  }

    let msgannonce = args.join(" ");

    var annonce = new Discord.RichEmbed()
        .addField(':loudspeaker: Annonce :', msgannonce)
        .setFooter('Fixnaming ', 'https://cdn.discordapp.com/attachments/491324786165678140/518854391063642189/Logo_FixNaming.jpg')
        .setTimestamp(new Date())
        .setColor('#00BFFF')
        
    message.channel.send("**@everyone - Une nouvelle annonce est disponible !**")
    message.channel.send(annonce);
}

module.exports.help = {
  name: "annonce"
}
