const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const prefix = botconfig.prefix;
const fs = require("fs");
const ms = require("ms");

const bot = new Discord.Client({disableEverone: true});

bot.on('ready', async () => {
  console.log(`${bot.user.username} Is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`In ${bot.guilds.size} Servers | .help`);

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

 if(!command.startsWith(prefix)) return;



//.help

  if(command === `${prefix}help`) {

    let botAvatar = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setAuthor("~Red Bot~")
    .setColor("#ff0000")
    .setThumbnail(botAvatar)
    .addField("**Made By:**", `Sniperrrrrr ツ#3263`)
    .addField("**Bot ID:**", bot.user.id)
    .addField("**Online servers:**", bot.guilds.size)
    .addField("**Created At:**", 'Sun Jun 03 2018');

  message.channel.sendEmbed(embed);

  return;
}

//.mute @user 1s/m/h/d

if(command === `${prefix}mute`) {

if(!message.member.hasPermission("MUTE_MEMBERS")) return await message.channel.send("You can't do that");

let toMute = message.guild.member(message.mentions.users.first());
if(!toMute) return message.channel.send("You didn't specify a user mention!");
if(toMute.id === message.author.id) return message.channel.send("you cannot mute yourself lol!");
if(toMute.id === bot.user.id) return message.channel.send("Please don't mute me :slight_frown: !");
if(toMute.id === "354639431434764290") return message.channel.send("You can't mute the RedBot Dev!");
if(toMute.id === message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't mute a staff member!");

let role = message.guild.roles.find(r => r.name === "Muted");
if(!role) return message.channel.send("Please do a role with the name: `Muted`");

if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

let mute2Embed = new Discord.RichEmbed()
.setDescription(`:white_check_mark: **<@${toMute.id}> Has beed muted!**`)
.setColor("#ff0000");

let muteTime = args[1];
if(!muteTime) return await toMute.addRole(role.id).then(message.channel.send(mute2Embed));

let muteEmbed = new Discord.RichEmbed()
.setDescription(`:white_check_mark: **<@${toMute.id}> Has been muted for ${ms(ms(muteTime))}**`)
.setColor("#ff0000")

await toMute.addRole(role.id);
message.channel.send(muteEmbed);

setTimeout(function() {
  toMute.removeRole(role.id);
  message.channel.send(`<@${toMute.id}> Has been unmuted!`);

}, ms(muteTime));


return;
}

//.unmute @user

if(command === `${prefix}unmute`) {

if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You can't do that");
let toMute = message.guild.member(message.mentions.users.first());
if(!toMute) return message.channel.send("You didn't specify a user mention!");

let role = message.guild.roles.find(r => r.name === "Muted");
if(!role || !toMute.roles.has(role.id)) return message.channel.send("this user is not muted!");

let unMuteEmbed = new Discord.RichEmbed()
.setDescription(`:white_check_mark: **<@${toMute.id}> Has been UnMuted**`)
.setColor("#ff0000")

await toMute.removeRole(role.id);
message.channel.send(unMuteEmbed);


return;
}

//.kick @user <reason>

if(command === `${prefix}kick`) {

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that");
  let kUser = message.guild.member(message.mentions.users.first());
  if(!kUser) return message.channel.send("You didn't specify a user mention!");
  if(kUser.id === message.author.id) return message.channel.send("you cannot kick yourself lol!");
  if(kUser.id === bot.user.id) return message.channel.send("Please don't kick me :slight_frown: !");
  if(kUser.id === "354639431434764290") return message.channel.send("You can't kick the RedBot Dev!");
  if(kUser.id === message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't kick a staff member!");

  let kickEmbednoReason = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **<@${kUser}> Has been Kicked from the server**`)
  .setColor("#ff0000")

  let kReason = args.join(" ").slice(22);
  if (!kReason) return message.send(kickEmbednoReason);

  let kickEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **${kUser} Has been Kicked from the server For "${kReason}"**`)
  .setColor("#ff0000")

  message.guild.member(kUser).kick(kReason);
  message.channel.send(kickEmbed);

  return;
}

//.ban @user <reason>

if(command === `${prefix}ban`) {

  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't do that");
  let bUser = message.guild.member(message.mentions.users.first());
  if(!bUser) return message.channel.send("You didn't specify a user mention!");
  if(bUser.id === message.author.id) return message.channel.send("you cannot ban yourself lol!");
  if(bUser.id === bot.user.id) return message.channel.send("Please don't ban me :slight_frown: !");
  if(bUser.id === "35463931434764290") return message.channel.send("You can't ban the RedBot Dev!");
  if(bUser.id === message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't ban a staff member!");

  let banEmbednoReason = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **${bUser} Has been Kicked from the server"**`)
  .setColor("#ff0000")

  let bReason = args.join(" ").slice(22);
  if (!bReason) return message.send(banEmbednoReason);

  let banEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **${bUser} Has been Kicked from the server For "${bReason}"**`)
  .setColor("#ff0000")

  message.guild.member(bUser).ban(bReason);
  message.channel.send(banEmbed);

  return;
}

//.warn @user <reason>

if(command === `${prefix}warn`) {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that");
  let wUser = message.guild.member(message.mentions.users.first());
  if(!wUser) return message.channel.send("You didn't specify a user mention!");


  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

  if(wUser.id === bot.user.id) return message.channel.send("Please don't warn me :slight_frown: !");
  if(wUser.id === message.author.id) return message.channel.send("you cannot warn yourself, lol!");
  if(wUser.id === "354639431434764290") return message.channel.send("You can't warn the RedBot Dev!");
  if(wUser.id === message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't warn a staff member!");

  let wReason = args.join(" ").slice(22);
  if (!wReason) return message.channel.send("You didn't specify a reason!");

  if(!warns[wUser.id]) warns[wUser.id] = {
  warns: 0
  };

  warns[wUser.id].warns++;

  let warnEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **${wUser} Has been Warned for "${wReason}" And now he has ${warns[wUser.id].warns} Warns**`)
  .setColor("#ff0000")

  await message.channel.send(warnEmbed);

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
  if (err) console.log(err);
  });

return;
}

//.bc <MSG>

if (message.content.split(' ')[0] == '.bc')
  message.guild.members.forEach( member => {
if (!message.member.hasPermission("MANAGE_MESSAGES"))  return message.reply("You can't do that!");

    member.send(`** ${message.content.substr(3)} **`);
    message.delete();

   });

   if(command === `${prefix}bc`) {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))  return;



  let embed4 = new Discord.RichEmbed()
  .setDescription(':white_check_mark: | Message sent!')
  .setColor("#ff0000")

    message.channel.send(embed4).then(message => message.delete(5000));
    message.delete();
 }

//clear [Num]

if(command === `${prefix}clear`) {

  if(!message.member.hasPermission("MANAGE_MESSAGES"))  return message.reply("You can't do that!");
  if(!args[0]) return message.channel.send("You didn't specify a number!");

  let clearEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **Deleted ${args[0]} messages!**`)
  .setColor("#ff0000")

  message.channel.bulkDelete(args[0]).then (() => {
    message.channel.send(clearEmbed).then(message => message.delete(5000));
  });
}

//.Make [Name] [Role]

if(command === `${prefix}make`) {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't do that");
  let makeUser = message.guild.member(message.mentions.users.first());
  if(!makeUser) return message.channel.send("You didn't specify a user mention!");

  let makeRole = message.guild.roles.find(r => r.name === `${args[1]}`);

  if(!args[1]) return message.channel.send("You didn't specify a role!");
  if(makeUser.roles.has(makeRole.id)) return message.channel.send(`This user is already a ${arg[1]}!`);

  let makeEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **<@${makeUser.id}> Is Now a ${args[1]}**`)
  .setColor("#ff0000")

  await makeUser.addRole(makeRole.id);
  message.channel.send(makeEmbed);
}

//.RemoveRole [Name] [Role]

if(command === `${prefix}removerole`) {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't do that");
  let removUser = message.guild.member(message.mentions.users.first());
  if(!removUser) return message.channel.send("You didn't specify a user mention!");

  let removRole = message.guild.roles.find(r => r.name === `${args[1]}`);

  if(!args[1]) return message.channel.send("You didn't specify a role!");
  if(removUser.roles.has(!removRole.id)) return message.channel.send(`This user is Not a ${arg[1]}!`);

  let removEmbed = new Discord.RichEmbed()
  .setDescription(`:white_check_mark: **<@${removUser.id}> Is Now Removed from beeing a ${args[1]}**`)
  .setColor("#ff0000")

  await removUser.removeRole(removRole.id);
  message.channel.send(removEmbed);
}

  
  
  
//Talk Cmds
  
if(message.content(`bit.ly`)) {
  message.channel.bulkDelete(1);
}
  
if(message.has(`.com`)) {
   message.channel.bulkDelete(1);
}
  
  
  
//Tokens

});
bot.login(process.env.token);
