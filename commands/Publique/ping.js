const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
const chalk = require('chalk');
let getNow = () => { return { time: new Date().toLocaleString("en-EN", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }

module.exports = {
    name: "ping",
    aliases: [" "],
    description: "Voir la latence du client",
    usage: "<prefix>ping",
    permission: "Aucune",
    categorie: "public",
    cooldown: 2,
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {

        const date = Date.now();

        const bddPing = `${Date.now() - date}ms`; //marche plus
        const APIPing = `${client.ws.ping}ms`;

        let msg = message.channel.send(`calcul...`)
        const BotPing = `${(await msg).createdTimestamp - message.createdTimestamp}ms`;
        if(BotPing >= 100) { message.channel.send("⚠️ **La latence du bot est élevée (${ping}ms)**") };

                // Colors yayy!
                let colorVar;
                switch (true) {
                case BotPing < 150:
                    colorVar = 0x7289da;
                    break;
                case BotPing < 250:
                    colorVar = 0x35fc03;
                    break;
                case BotPing < 350:
                    colorVar = 0xe3f51d;
                    break;
                case BotPing < 400:
                    colorVar = 0xf7700f;
                    break;
                default:
                    colorVar = 0xf7220f;
                    break;
                }

        let embed = new Discord.MessageEmbed()
            .addFields({
                name: `${lang.util.latt}`,
                value: BotPing,
                inline: true,
            }, {
                name: `${lang.util.api}`,
                value: APIPing,
                inline: true,
            }, {
                name: `${lang.util.bdd}`,
                value: `\`🟢\` ${lang.util.coo}`,
                inline: true,
            })
            .setColor(colorVar);

        (await msg).edit({ content: " ", embeds: [embed] });

    }
}