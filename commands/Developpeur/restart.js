const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "restart", 
    description: "Relancer le bot", 
    usage: "-restart", 
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(client.config.dev.includes(message.author.id)){

        message.channel.send(`Redémarrage...`).then(() => {
            setTimeout(() => {
                message.channel.send(`Bot en ligne`);
            }, 3500)
            setTimeout(() => {
            require("child_process").execSync("node index.js")  
            }, 4000)
        })
    }

    }
}