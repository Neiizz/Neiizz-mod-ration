const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "punish", 
    aliases: ["sanction", "punition"], 
    description: "Changer les punitions pour chacunes des protections du bot", 
    usage: "-punish <protection> <ban/kick/derank>",
    categorie: "perm4",
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
            else if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm3_user_${message.guild.id}`)) pass = 'no'
            else if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(message.author.id) && client.db["perm"].get(`perm4_user_${message.guild.id}`)) pass = 'oe'
            else if(client.db["perm"].get(`perm_${commandName}_${message.guild.id}`) === "public") pass = 'no'
        } else pass = 'oe'
        if(pass === 'no') return message.reply(`\`⛔️\` *Erreur* **Tu doit être dans la \`permissions 4\` pour utilisé cette commande **`)

        let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix

        if(!args.length) return message.channel.send(`Veuillez me donner une protection \nPlus d'info: \`${prefix}pinfo\` `);

        if(args[0] === "antilink"){
            if(!args[1]) return message.channel.send(`Veuillez me donner une punition : \`ban/kick/derank\` `);

            if(args[1] === "ban"){
                if(client.db["punish"].get(`antilinkpunish_${message.guild.id}`) === "ban") return message.channel.send(`La punition pour cette protection est déjà un ban`);

                client.db["punish"].set(`antilinkpunish_${message.guild.id}`, "ban").save();
                message.channel.send(`La punition pour cette protection est désormais un ban`); 
            }
            if(args[1] === "kick"){
                if(client.db["punish"].get(`antilinkpunish_${message.guild.id}`) === "kick") return message.channel.send(`La punition pour cette protection est déjà un kick`);

                client.db["punish"].set(`antilinkpunish_${message.guild.id}`, "kick").save();
                message.channel.send(`La punition pour cette protection est désormais un kick`);
            }
            if(args[1] === "derank"){
                if(client.db["punish"].get(`antilinkpunish_${message.guild.id}`) === "derank") return message.channel.send(`La punition pour cette protection est déjà un derank`);

                client.db["punish"].set(`antilinkpunish_${message.guild.id}`, "derank").save();
                message.channel.send(`La punition pour cette protection est désormais un derank`);
            }
        }

        if(args[0] === "antispam"){
            if(!args[1]) return message.channel.send(`Veuillez me donner une punition : \`ban/kick/derank\``);

            if(args[1] === "ban"){
                if(client.db["punish"].get(`antispampunish_${message.guild.id}`) === "ban") return message.channel.send(`La punition pour cette protection est déjà un ban`);

                client.db["punish"].set(`antispampunish_${message.guild.id}`, "ban").save();
                message.channel.send(`La punition pour cette protection est désormais un ban`); 
            }
            if(args[1] === "kick"){
                if(client.db["punish"].get(`antispampunish_${message.guild.id}`) === "kick") return message.channel.send(`La punition pour cette protection est déjà un kick`);

                client.db["punish"].set(`antispampunish_${message.guild.id}`, "kick").save();
                message.channel.send(`La punition pour cette protection est désormais un kick`);
            }
            if(args[1] === "derank"){
                if(client.db["punish"].get(`antispampunish_${message.guild.id}`) === "derank") return message.channel.send(`La punition pour cette protection est déjà un derank`);

                client.db["punish"].set(`antispampunish_${message.guild.id}`, "derank").save();
                message.channel.send(`La punition pour cette protection est désormais un derank`);
            }
        }

        if(args[0] === "antiwebhook"){
            if(!args[1]) return message.channel.send(`Veuillez me donner une punition : \`ban/kick/derank\``);

            if(args[1] === "ban"){
                if(client.db["punish"].get(`antiwebpunish_${message.guild.id}`) === "ban") return message.channel.send(`La punition pour cette protection est déjà un ban`);

                client.db["punish"].set(`antiwebpunish_${message.guild.id}`, "ban").save();
                message.channel.send(`La punition pour cette protection est désormais un ban`); 
            }
            if(args[1] === "kick"){
                if(client.db["punish"].get(`antiwebpunish_${message.guild.id}`) === "kick") return message.channel.send(`La punition pour cette protection est déjà un kick`);

                client.db["punish"].set(`antiwebpunish_${message.guild.id}`, "kick").save();
                message.channel.send(`La punition pour cette protection est désormais un kick`);
            }
            if(args[1] === "derank"){
                if(client.db["punish"].get(`antiwebpunish_${message.guild.id}`) === "derank") return message.channel.send(`La punition pour cette protection est déjà un derank`);

                client.db["punish"].set(`antiwebpunish_${message.guild.id}`, "derank").save();
                message.channel.send(`La punition pour cette protection est désormais un derank`);
            }
        }

    } 
}