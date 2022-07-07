const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "banlist", 
    aliases: ["allbans", "banliste"], 
    description: "Voir la liste des bannis du serveur", 
    usage: "-banlist", 
    categorie: "mod",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args, lang, commandName) => {
        let pass = 'no';
        if(message.guild.ownerId === message.author.id || !client.config.owners.includes(message.author.id)) {
            if(!client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) {
            if(client.db["perm"].get(`permban_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`permban_user_${message.guild.id}`) ) pass = 'oe'
        } else pass = 'oe' 
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions ban\` pour utilisé cette commande **`)
        }

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        message.guild.bans.fetch().then((bans) => {
            const allbans = bans.map(m => ({
                user: `**Membre:** <@${m.user.id}> (\`${m.user.tag}\`) \n**ID:** \`${m.user.id}\` \n**Raison:** \`${m.reason}\` \n `
              }));
              const banList = Array.from(allbans);
              if (banList.length < 1) return message.channel.send(`Aucun bannissement.`);
              
              const embed = new Discord.MessageEmbed()
              .setTitle("Liste des membres ban du serveur !")
              .setDescription(`${banList.map(bl => `\n${bl.user}`).join("")}`)
              .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
              .setTimestamp()  
              .setColor(color || client.config.color)
         
              message.channel.send({embeds : [embed]})
        })
    }
}