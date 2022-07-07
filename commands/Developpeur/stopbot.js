const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "stopbot", 
    description: "Arreter le bot", 
    usage: "-stopbot", 
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(client.config.dev.includes(message.author.id)){

        message.channel.send(`Le bot va s'éteindre d'ici 20 secondes.`).then(() => {
            setTimeout(() => {
            client.destroy();
            }, 20000)
        })
    }
    }
}