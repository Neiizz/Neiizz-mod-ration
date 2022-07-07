const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "roleDelete", 

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Role} role 
     */
    run: async(client, role, message) => {
        if(client.db["logs"].get(`rolelogs_${role.guild.id}`) === null || client.db["logs"].get(`rolelogs_${role.guild.id}`) === undefined) return;

        if(client.db["logs"].get(`rolelogs_${role.guild.id}`)){
          
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `〃 Roles Supprimé ` })
            //.setColor(`${client.config.color}`)
            .setColor(`${role.hexColor}`)
            .addField(`Nom du rôle :`, `${role} | \`${role.id}\` `)
            .addField(`Couleur du rôle :`, `*\`${role.hexColor}\`*`)
            .addField(`Position du rôle :`, `\`${role.position}\``)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp();

            role.guild.channels.cache.get(client.db["logs"].get(`rolelogs_${role.guild.id}`))?.send({embeds: [embed]}); 
        }
    }
}