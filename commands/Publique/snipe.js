const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "snipe", 
    aliases: ["sn"],
    description: "Voir le dernier message supprimé dans un salon textuel", 
    usage: "-snipe", 
    categorie: "public",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args, lang, commandName) => {
        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

       /* let pass = 'no';
        if(!client.config.owners.includes(message.author.id)) {
            if(client.db["owner"].get(`owners`)?.includes(message.author.id)) pass = "oe";
            else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "1") pass = 'oe'
            else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "2") pass = 'oe'
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "3") pass = 'oe'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "4") pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'oe'
        } else pass = 'oe'
        if(pass === 'no') return; */

        let messagesnipe = await client.db["snipe"].get(`messagesnipe_${message.channel.id}`); 
        let authorsnipe = await client.db["snipe"].get(`authorsnipe_${message.channel.id}`); 
        let pdpsnipe = await client.db["snipe"].get(`pdpsnipe_${message.channel.id}`);

        if(messagesnipe === null && authorsnipe === null && pdpsnipe === null) return message.channel.send(`Aucun message enregistrer !`);

        let links = ["https://", "http://", ".com", "discord.gg", "discord.com", ".com", ".net", ".org", ".fr", ".gg/", ".tk", "gg/"]; 

        links.forEach((link) => {
            if(messagesnipe.includes(link)){
            messagesnipe = `**▬▬▬▬▬▬▬▬[LIEN]▬▬▬▬▬▬▬▬**`
            }
        })

        let embed = new Discord.MessageEmbed()
        .setAuthor({name: `${authorsnipe.username}`, iconURL: pdpsnipe})
        .setDescription(`${messagesnipe}`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color) 

        message.channel.send({embeds: [embed]});

    }
}