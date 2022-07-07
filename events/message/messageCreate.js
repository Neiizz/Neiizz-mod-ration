const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs').promises
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {
        if (!message) return;
        if (!message.author) return;
        if(message.author.bot) return;
        if(message.channel.type !== 'DM') {
        let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix

        //message.reply(`Mon prefix est \`${prefix}\``) // a garder de coté on c jms

        const embed = new Discord.MessageEmbed()
        .setDescription(`Salut <@${message.author.id}> ! moi c'est **${client.user.username}** ! Mon prefix sur ce serveur est \`${prefix}\` \n\nN'hésite pas à faire \`${prefix}help\` ou \`${prefix}helpall\` pour voir la liste de mes commandes  `)
        .setFooter({ text: `Passe une bonne journée sur ${message.guild.name}` })
        .setColor(client.config.color)
        
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.reply({ embeds: [embed] }).catch(e => { })
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@${client.user.id}>`
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@!${client.user.id}>`
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) return
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args[0].toLowerCase().normalize()
        const cmd = client.commands.get(commandName) || client.aliases.get(commandName)
        if (!cmd) return
        let language;
        if(db.get(`lang_${message.guild.id}`) === undefined || db.get(`lang_${message.guild.id}`) === null) {
            await db.set(`lang_${message.guild.id}`, "fr") 
            language = db.get(`lang_${message.guild.id}`)
        }
        language = db.get(`lang_${message.guild.id}`)
        const lang = JSON.parse(await fs.readFile(`./languages/${language}.json`, err => {if(err) {console.log(err)}}))
        try {
        args.shift()
        cmd.run(client, message, args, lang, commandName)
        } catch (err) {
         console.log(err)
        }
    }
    else {
        let prefix = client.config.prefix
        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.reply(`Mon prefix est \`${prefix}\``).catch(e => { })
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@${client.user.id}>`
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@!${client.user.id}>`
        if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) return
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args[0].toLowerCase().normalize()
        const cmd = client.commands.get(commandName) || client.aliases.get(commandName)
        if (!cmd) return
        let language;
        language = 'fr'
        const lang = JSON.parse(await fs.readFile(`./languages/${language}.json`, err => {if(err) {console.log(err)}}))
        try {
        args.shift()
        cmd.run(client, message, args, lang, commandName)
        } catch (err) {
         console.log(err)
        }
    }
    }
}