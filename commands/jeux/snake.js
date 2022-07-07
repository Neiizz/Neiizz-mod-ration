const Discord = require('discord.js');
const {bot} = require('../../structures/client');
const { Snake } = require('weky')

module.exports = {
    name: "snake", 
    aliases: [], 
    description: "z", 
    usage: "-chlogs", 
    categorie: "fun",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {*} lang 
     */
    run: async(client, message, args) => {
        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        await Snake({
            message: message,
            embed: {
                title: 'Snake',
                description: 'GG, tu à fait un score de **{{score}}** points!',
                color: color || client.config.color,
                footer: `${client.config.footer}`,
                timestamp: true
            },
            emojis: {
                empty: '⬛',
                snakeBody: '🐍',
                food: '🍎',
                up: '⬆️',
                right: '⬅️',
                down: '⬇️',
                left: '➡️',
            },
            othersMessage: 'Seul <@{{author}}> peut utilisé les boutons!',
            buttonText: 'Arrêter'
        });
    }
}