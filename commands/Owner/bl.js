const Discord = require('discord.js'); 
const {bot} = require('../../structures/client'); 

module.exports = {
    name: "blacklist", 
    aliases: ["bl"], 
    description: "Blacklister un utilisateur ou voir la liste des blacklistés", 
    usage: "-blacklist [user]", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     * @param {string} commandName 
     */
    run: async(client, message, args, lang, commandName) => {
        if(!client.config.owners.includes(message.author.id)) return; 

        let color = await client.db["color"].get(`theme`); 
        if(color === null || color === undefined) color = `${client.config.color}`;

        if(!args.length){
            let bl = await client.db["blacklist"].get(`bl`); 

            let embed = new Discord.MessageEmbed()
            .setTitle("Blacklist")
            .setDescription(`${!bl ? "La blacklist est vide" : bl?.map(function(b) {return `<@${b}>`}).join("\n")}`)
            .setColor(color || client.config.color); 

            message.channel.send({embeds : [embed]}); 
        }
        else {
            let user = message.mentions.users.first() || client.users.cache.get(args[0]); 
            if(!user) return message.channel.send("Utilisateur invalide"); 

            if(client.db["blacklist"].get(`bl`)?.includes(user.id)) return message.channel.send(`<@${user.id}> est déjà blacklisté`);

            client.db["blacklist"].push(`bl`).save();
            client.guilds.cache.forEach(function(guild) {
                guild.members.cache.get(user.id)?.ban({reason: "Blacklist"}); 
            }); 

            await message.channel.send(`<@${user.id}> est désormais blacklisté`); 
        }
    }
}