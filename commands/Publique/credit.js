const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');

module.exports = {
    name: "credits",
    aliases: [" "],
    description: "d",
    usage: "<prefix>ping",
    categorie: "public",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, db) => {
        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        const zay = client.users.fetch('492049863031259136')
        const znag = client.users.fetch('737452221880336456')

        const embed = new Discord.MessageEmbed()
        .setTitle(`**Crédits**`)
        .addField(`**Développeur:**`, `\n[${(await zay).username}#${(await zay).discriminator}](https://discord.com/users/492049863031259136) \n[${(await znag).username}#${(await znag).discriminator}](https://discord.com/users/737452221880336456)`)
        .addField(`**Techniciens:**`, `\n-`)
        .addField(`**Supports:**`, `\n-`)
        .addField(`**Beta testers:**`, `\n-`)
        .setColor(color || client.config.color)

        message.reply({allowedMentions: { repliedUser: false }, embeds: [embed] })

    }
}