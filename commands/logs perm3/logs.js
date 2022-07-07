const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "logs", 
    description: "Activer ou désactiver les logs des modérations", 
    usage: "-modlogs <on/off> [salon]", 
    categorie: "perm3",
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
            if(client.db["owner"].get(`owners_${message.guild.id}`)?.includes(message.author.id)) pass = "oe";
            else if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm1_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm2_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions 3\` pour utilisé cette commande **`)


        if(!args.length) return message.channel.send(`Veuillez me donner \`info/off\` \n*Exemple:* \`*logs info\` `);

        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;



        if(args[0] === "info"){
        ///////////////////////////////////////////////////////////////////////
        // LOGS MESSAGES
        let ab = client.db["logs"].get(`msglogs_${message.guild.id}`);
        if(ab) ab = `<#${ab}>`; 
        if(ab === null || ab === undefined) ab = "\`Désactivé\`";
        // LOGS CHANNELS
        let ch = client.db["logs"].get(`chlogs_${message.guild.id}`);
        if(ch) ch = `<#${ch}>`; 
        if(ch === null || ch === undefined) ch = "\`Désactivé\`";
        // LOGS MODERATIONS
        let md = client.db["logs"].get(`modlogs_${message.guild.id}`);
        if(md) md = `<#${md}>`;
        if(md === null || md === undefined) md = "\`Désactivé\`";
        // LOGS ROLES
        let rl = client.db["logs"].get(`rolelogs_${message.guild.id}`);
        if(rl) rl = `<#${rl}>`;
        if(rl === null || rl === undefined) rl = "\`Désactivé\`";
        ///////////////////////////////////////////////////////////////////////

        const embed = new Discord.MessageEmbed()
        .setTitle(`Logs`)
        .addField(`Message`, `${ab} `)
        .addField(`Modération`, `${md} `)
        .addField(`Channel`, `${ch} `)
        .addField(`Rôles`, `${rl} `)
        .setColor(color || client.config.color)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({ embeds: [embed] })

        }

        ///////////////////////////////////////////////////////////////////////

        if(args[0] === "off"){
            const embed1 = new Discord.MessageEmbed()
            .setDescription(`<:988389407730040863:989913066688901211> **Tous les logs sont (*déjà*) désactivé **`)
            .setColor(color || client.config.color)

            client.db["logs"].delete(`modlogs_${message.guild.id}`).save();
            client.db["logs"].delete(`chlogs_${message.guild.id}`).save();
            client.db["logs"].delete(`msglogs_${message.guild.id}`).save();
            client.db["logs"].delete(`rolelogs_${message.guild.id}`).save();
            message.channel.send({ embeds: [embed1] })

        }

        ///////////////////////////////////////////////////////////////////////
    }
}