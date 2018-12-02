const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(botconfig.prefix)) return; 
  
  async function purge() {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        var embed = new Discord.RichEmbed()
          .setDescription(`:x: Vous n'avez pas les permissions nécessaires pour effectuer cette commande.`)
          .setColor('0xCC0000')
          return message.channel.send({embed}.then(msg => msg.delete(2500)));
    }
        
    if(!args[0]) {
        var embed = new Discord.RichEmbed()
            .setDescription(`:x: Merci de mettre un nombre.`)
            .setColor('0xCC0000')
        return message.channel.send({embed}).then(msg => msg.delete(2500));
    }
        
        
    if(args > args[0]){
        var embed = new Discord.RichEmbed()
            .setDescription(`:x: Merci de mettre que 1 arguments.`)
            .setColor('0xCC0000')
        return message.channel.send({embed}).then(msg => msg.delete(2500));
    }

    if(args[0] > 100){
        var embed = new Discord.RichEmbed()
            .setDescription(`:x: Merci de mettre un nombre entre 1 et 100.`)
            .setColor('0xCC0000')
        return message.channel.send({embed}).then(msg => msg.delete(2500));
    }

    const deleteCount = parseInt(args[0], 10);

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Erreur: ${error}`));

    var clear = new Discord.RichEmbed()
        .setDescription(`:loudspeaker: ${fetched.size} Message enlevé.`)
        .setColor('RANDOM')
        
    message.channel.send(clear).then(msg => msg.delete(5000));

    

  }

  purge();

}

module.exports.help = {
  name: "clear"
}
