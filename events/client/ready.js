const Discord = require('discord.js');
const { Bot } = require('../../structures/client')
const colors = require('colors'); 
const moment = require('moment');
require("moment-duration-format");
const chalk = require('chalk');
let getNow = () => { return { time: new Date().toLocaleString("en-EN", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.NonThreadGuildBasedChannel} channel
     */
    run: async (client, channel, message) => {  

        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

       // console.clear()
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.white)
            console.log(`Nom du bot -> ${client.user.tag}`.magenta)
            console.log(`Nombres de serveurs -> ${client.guilds.cache.size} serveur(s)`.magenta)
            console.log(`Membres total -> ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} membre(s)`.magenta)
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.white)
            console.log(`[${moment().format('HH:mm:ss')} - INFO] - Buyer - Developpeur`.red)
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.white)
            console.log(`Buyer(s) - ${client.config.owners.join(" - ")}`.green)
            console.log(`Developpeur(s) - ${client.config.dev.join(" - ")}`.blue)
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.white)
            console.log(`${chalk.cyan(getNow().time)} - ${chalk.green("Restart")}`)

        client.users.fetch().then(() => {
            client.guilds.fetch()
        }).catch(err => { }); 

        client.user.setActivity(`${client.guilds.cache.size} serveurs || ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Membres`, { type: 'STREAMING', url: "https://twitch.tv/zaywasheree" })
        setInterval(async () => {
            client.user.setActivity(`${client.guilds.cache.size} serveurs || ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Membres`, { type: 'STREAMING', url: "https://twitch.tv/zaywasheree" })
        }, 120000)
        client.user.setStatus('dnd')


        const embed = new Discord.MessageEmbed()
        .setTitle(`**Bot Opérationel**`)
        .setDescription(`le bot **${client.user.username}** est de nouveaux **__en ligne__** ! \nle bot vient de redémarrer avec \`${client.commands.size}\` commandes \n<t:${parseInt(client.readyTimestamp / 1000)}:R>`)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({ text: `${client.user.tag}` })
        .setColor(color || client.config.color)

        const on = client.channels.cache.get(client.config.start)

        on.send({ embeds : [embed] }).then(re => {
            re.react("⏳");
        });

    }
}