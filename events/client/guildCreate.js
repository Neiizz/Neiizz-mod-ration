const { Guild } = require('discord.js');
const {bot} = require('../../structures/client');
const fs = require('fs');

module.exports = {
    name: "guildCreate", 

    /**
     * 
     * @param {bot} client 
     * @param {Guild} guild 
     */
    run: async(client, guild) => {

        const action = guild.fetchAuditLogs({limit: 1, type: "BOT_ADD"}).then((audit) => audit.entries.first());
        let author = (await action).executor;

     /*   if(!client.config.owners.includes(author.id) && !client.db["settings"].get(`owner_${author.id}`) === true) {
            guild.leave();
            client.config.owners.forEach(owner => {
                client.users.cache.get(owner)?.send(`J'ai rejoins \`${guild.name}\` mais je l'ai quitté car \`${author.tag}\` ne fait pas parti de mes owners`)
            })
        }; */
        
        print(`[Nouveau Serveur]`)
        print(`- ${guild.name}`)
        print(`- ${guild.id}`)
        print(`- ${guild.ownerId} (Propriétaire)`)
        print(`- ${guild.memberCount} membres`)
        print(`- ${guild.channels.cache.size} salons`)
        print(`- ${guild.roles.cache.size} roles`)
        print(`- ${guild.emojis.cache.size} emojis`); 


      /*  if(client.guilds.cache.size >= 5) {
            guild.leave();
            client.config.owners.forEach(owner => {
                client.users.cache.get(owner).send(`J'ai rejoins \`${guild.name}\` mais je l'ai quitté car j'ai atteins ma limite de serveur`);
            })
        } */

       /* client.config.owners.forEach(function(owner) {
            guild.fetchOwner().then((own) => {
            client.users.cache.get(owner)?.send(`J'ai rejoins \`${guild.name}\`\nSon propriétaire : ${own.user.tag}\nNombre de membres : ${guild.memberCount}\nCelui qui m'a invité : ${author.tag}`); 
            })
        }) */

        client.db["system"].push(`servers`, 1).save();
    }
}