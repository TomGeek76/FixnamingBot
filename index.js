const botconfig = require("./botconfig.json");
const Discord   = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

let initialMessage = `**Réagissez aux messages ci-dessous pour recevoir le rôle associé. Si vous souhaitez supprimer le rôle, supprimez simplement votre réaction !**`;
const roles = ["▷ STREAMERS", "▷ YOUTUBEURS", "▷ FILLE", "▷ GARS"];
const reactions = ["1⃣", "2⃣", "3⃣", "4⃣"];
const setupCMD = "!createrolemessage"

bot.commands = new Discord.Collection();

function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount; // Return amount of bots
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; 
    });
    return memberCount;
  }

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Aucune commandes n'a été trouvé");
    return
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`)
    bot.commands.set(props.help.name, props);
  });

})

bot.on("ready", (member) => {
  console.log(`${bot.user.username} est en ligne !`);
  bot.user.setActivity(`[ f!help ] | Fixnaming`);
})

function generateMessages(){
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles) messages.push(`Réagissez ci-dessous pour obtenir le role **"${role}"** !`);
  return messages;
}


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

})

bot.on("raw", event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
    let channel = bot.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then(msg => {
      let user = msg.guild.members.get(event.d.user_id);
      
      if (msg.author.id == bot.user.id && msg.content != initialMessage){
        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = msg.content.match(re)[1];

        if (user.id != bot.user.id){
          var roleObj = msg.guild.roles.find(r => r.name === role);
          var memberObj = msg.guild.members.get(user.id);
          
          if (event.t === "MESSAGE_REACTION_ADD"){
              memberObj.addRole(roleObj)
          } else {
              memberObj.removeRole(roleObj);
          }
        }
      }
    })

}
})

bot.login(process.env.TOKEN);
