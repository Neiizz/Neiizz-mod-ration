const Discord = require('discord.js');
const {bot} = require('../../structures/client'); 
const db = require('quick.db');

module.exports = {
    name: "info", 
    aliases: [], 
    description: "Changer la langue du bot", 
    usage: "-setlang <fr/en>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang, commandName) => {
        if(message.guild.ownerId === message.author.id || client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)){

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
        if(color === null || color === undefined) color = `${client.config.color}`;

            let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix

            let ab = await client.db["color"].get(`theme_${message.guild.id}`); 
                if(ab === null || ab === undefined) ab = `${client.config.color}`; 
                if(ab === true) ab = `${color}`;


            const embed = new Discord.MessageEmbed()
            .setTitle(`info`)
            .addField(`Couleur des embed`, `\`${ab}\` `)
            .addField(`Prefixe sur le serveur`, `\`${prefix}\` `) 
            .addField(`Developpeur`, `\`${client.config.owners}\` (<@${client.config.owners}>) `)
            .addField(`Avatar du bot`, `[\`Avatar actuel\`](${client.user.displayAvatarURL()}) `)
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()

            message.channel.send({ embeds: [embed] })
        }
    }
}