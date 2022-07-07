const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "startlogs", 
    aliases: [], 
    description: "Activer ou désactiver les logs des message supprimés/modifiés", 
    usage: "-messagelogs <on/off> [salon]", 
    categorie: "perm3",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args, lang, commandName) => {
        if(client.config.dev.includes(message.author.id)){

        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        const embed1 = new Discord.MessageEmbed()
        .setDescription(`**Veuillez me préciser** \`on/off\` **et le salon**`)
        .setColor(color || client.config.color)
        
        const embed2 = new Discord.MessageEmbed()
        .setDescription(`**Ce salon est déjà attribué aux logs start **`)
        .setColor(color || client.config.color)

        const embed4 = new Discord.MessageEmbed()
        .setDescription(`**Les logs start sont déjà désactivés**`)
        .setColor(color || client.config.color)

        const embed5 = new Discord.MessageEmbed()
        .setDescription(`Les logs start sont désormais **désactivés**`)
        .setColor(color || client.config.color)


        if(!args.length) return message.channel.send({ embeds: [embed1] });

        if(args[0] === "on"){
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel;

            if(client.db["logs"].get(`startlogs_${message.guild.id}`) === channel.id) return message.channel.send({ embeds: [embed2] }); 

            client.db["logs"].set(`startlogs_${message.guild.id}`, channel.id).save();

            const embed3 = new Discord.MessageEmbed()
            .setDescription(`Les logs start sont désormais **activés** dans <#${channel.id}>`)
            .setColor(color || client.config.color)

            message.channel.send({ embeds: [embed3] })
        }
        if(args[0] === "off"){
            if(client.db["logs"].get(`startlogs_${message.guild.id}`) === "off") return message.channel.send({ embeds: [embed4] }); 

            client.db["logs"].delete(`startlogs_${message.guild.id}`).save();
            message.channel.send({ embeds: [embed5] }); 
        }
    }
    }
}