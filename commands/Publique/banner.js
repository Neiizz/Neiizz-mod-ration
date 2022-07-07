const Discord = require('discord.js');
const { Database } = require('luma-db');
const { Bot } = require('../../structures/client');

module.exports = {
    name: "banner",
    description: "Permet d'afficher la bannière d'un utilisateur.",
    usage: "<prefix>banner",
    categorie: "public",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
        if(color === null || color === undefined) color = `${client.config.color}`;

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let banner = await user.user.fetch().then(a => a.bannerURL({dynamic: true, size: 4096}))
                if (banner) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`${user.user.tag} | ${user.user.id}`)
            .setImage(banner)
            .setColor(color || client.config.color)
         message.reply({embeds : [embed]})
                }
                else {
                    return message.reply(`${user.user.tag} n'a pas de bannière.`)
                }
        
    }
}