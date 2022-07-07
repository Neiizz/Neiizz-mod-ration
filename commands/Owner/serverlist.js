const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "serverlist",
    aliases: ["server", "servers", "guild", "guilds"], 
    description: "Voir tous les serveurs que possède le bot", 
    usage: "<prefix>serverlist", 
    permission: ` \`BUYER\` `,
    categorie: "param",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        if(client.config.owners.includes(message.author.id)){

        let guilds = client.guilds.cache.map((guilds) => `**${guilds.name}** - \`(${guilds.id})\` **[${guilds.memberCount}]**`).join("\n"); 


        let embed = new Discord.MessageEmbed()
        .setTitle(`〃Liste De Serveurs`)
        .setDescription(`${guilds}` || "Aucun serveur")
        .setTimestamp()
        .setColor(color || client.config.color)

        message.channel.send({embeds: [embed]}); 

        }
    }
}