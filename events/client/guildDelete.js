const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "guildDelete",

    /**
     * 
     * @param {bot} client 
     * @param {Discord.Guild} guild 
     */
    run: async(client, guild) => {
        client.db["system"].remove("servers", 1).save();
    }
}