const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 

  var replys = [
      "Essaye plus tard",
      "Essaye encore",
      "Pas d'avis",
      "C'est ton destin",
      "Le sort en est jeté",
      "Une chance sur deux",
      "Repose ta question",
      "D'après moi oui",
      "C'est certain",
      "Oui absolument",
      "Sans aucun doute",
      "Très probable",
      "Oui",
      "C'est bien parti",
      "C'est non",
      "Peu probable",
      "Faut pas rêver",
      "N'y compte pas",
      "Impossible"
  ];
  
  if(!args[0]){
    var embed = new Discord.RichEmbed()
      .setDescription(`:x: Merci de poser une question :8ball:.`)
      .setColor('0xCC0000')
    return message.channel.send(embed);
  }

  let question = args.join(" ");
  
  let reponse = (replys[Math.floor(Math.random() * replys.length)]);
  var bembed = new Discord.RichEmbed()
    .setDescription(":8ball: 8ball")
    .addField("Question", question)
    .addField("Réponse", reponse)
    .setColor("RANDOM")
  message.channel.send(bembed);

}

module.exports.help = {
  name: "8ball"
}
