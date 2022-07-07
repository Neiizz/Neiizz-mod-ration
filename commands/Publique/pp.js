const Discord = require('discord.js');
const { Bot } = require('../../structures/client');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "pic",
    aliases: ['pp', 'pdp'],
    description: "Permet de voir la photo de profil d'un utilisateur.",
    usage: "<prefix>pic",
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

        texte = `${args.join(" ")}`;
        if (texte && !message.mentions.users.size) {
            const ids = Array(texte.split(" "));
            ids.forEach(x => {
                x.forEach(async y => {
                    if (isNaN(y)) return message.reply(`\`${y}\` n'est pas une ID valide.`);
                    if (y.length < 18) return message.reply(`\`${y}\` n'est pas assez long pour être une ID.`);
                    if (y.length > 18) return message.reply(`\`${y}\` est trop long pour être une ID.`);
    
                    const user = await client.users.fetch(y);
    
                    const aIDEmbed = new Discord.MessageEmbed()
                    .setTitle(`Avatar de ${user.tag}`)
                    .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
                    .setFooter({ text: `Demander par ${message.author.tag}` })
                    .setColor(color || client.config.color)
    
                    message.channel.send({ embeds: [aIDEmbed] });
                 })
            })
        } else if (!message.mentions.users.size) {
            const avatar1Embed = new Discord.MessageEmbed()
            .setDescription("**Voici ton avatar**")
            .setImage(message.author.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor(color || client.config.color)
            return message.channel.send({ embeds: [avatar1Embed] });
        }
    
        const avatarList = message.mentions.users.map(user => {
            const avatar2Embed = new Discord.MessageEmbed()
            .setDescription(`**Voici l'avatar de ${user.tag}**`)
            .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setFooter({ text: `Demander par ${message.author.tag}` })
            .setColor(color || client.config.color)
          return message.channel.send({ embeds: [avatar2Embed] })

        });
    }
}