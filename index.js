const Discord = require("discord.js");
const fs = require("fs")
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} Loaded succesfully without an error!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    bot.user.setActivity(`Youtube`, {type: "WATCHING"});
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'welkom');
    if (!channel) return;
    var embed = new Discord.RichEmbed()
    .setTitle("New player joined! :sunglasses:")
    .setColor("#10ff00")
    .setDescription(`Welcome ${member.displayName} to the server! :white_check_mark: :tada:`)
    channel.send(embed)
});

bot.on('guildMemberRemove', member=> {
    const channel = member.guild.channels.find('name', 'welkom');
    if (!channel) return;
    var embed = new Discord.RichEmbed()
    .setTitle("A LEAVER!! :cry:")
    .setColor("#ff0000")
    .setDescription(`WHY! ${member.displayName} WHY DID YOU LEAVE!! :x: :cry:`)
    channel.send(embed)
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send(`Hello ${message.author.tag} im a private bot still want me \n Contact ChinoBman#9363 For more details`)

    let prefix = botconfig.prefix
    var msg = message.content.toUpperCase();
    var sender = message.author;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0);

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)


    if(message.content == `<@${bot.user.name}>`) {
        message.channel.send(`Hey mijn prefix is: ${botconfig.prefix}`)
    }
});


bot.login(process.env.BOT_TOKEN);



//WELKOMSTMESSAGE = WELKOM
//STATS KANALEN ZIJN = stat1 = MemberCount
//                     stat2 = null
//                     stat3 = IP
//G Staat voor giveaway!
//S staat voor server
//I staat voor invitebot
//H staat voor help
//T staat voor test
//thomas = thoo_0224#4887
