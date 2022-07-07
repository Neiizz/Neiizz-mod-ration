const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "resetperm", 
    description: "Rétirer tous les membres qui ont accès à une permission spécifique", 
    usage: "-resetperm <1/2/3/4/ban/kick/gw>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
        if(message.guild.ownerId === message.author.id || client.config.owners.includes(message.author.id)){
            if(!args.length) return message.channel.send(`${lang.rperm.dperm} : \`1/2/3/4/ban/kick\` `); 

            if(args[0] === "1"){
                if(client.db["perm"].get(`perm1_user_${message.guild.id}`) === null || client.db["perm"].get(`perm1_user_${message.guild.id}`) === undefined || client.db["perm"].get(`perm1_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dperm1}`);

                client.db["perm"].set(`perm1_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.aperm1}`);
            }
            if(args[0] === "2"){
                if(client.db["perm"].get(`perm2_user_${message.guild.id}`) === null || client.db["perm"].get(`perm2_user_${message.guild.id}`) === undefined || client.db["perm"].get(`perm2_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dperm2}`);

                client.db["perm"].set(`perm2_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.aperm2}`);
            }
            if(args[0] === "3"){
                if(client.db["perm"].get(`perm3_user_${message.guild.id}`) === null || client.db["perm"].get(`perm3_user_${message.guild.id}`) === undefined || client.db["perm"].get(`perm3_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dperm3}`);

                client.db["perm"].set(`perm3_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.aperm3}`);
            }
            if(args[0] === "4"){
                if(client.db["perm"].get(`perm4_user_${message.guild.id}`) === null || client.db["perm"].get(`perm4_user_${message.guild.id}`) === undefined || client.db["perm"].get(`perm4_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dperm4}`);

                client.db["perm"].set(`perm4_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.aperm4}`);
            }
            if(args[0] === "ban"){
                if(client.db["perm"].get(`permban_user_${message.guild.id}`) === null || client.db["perm"].get(`permban_user_${message.guild.id}`) === undefined || client.db["perm"].get(`permban_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dpermBan}`);

                client.db["perm"].set(`permban_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.apermBan}`);
            }
            if(args[0] === "kick"){
                if(client.db["perm"].get(`permkick_user_${message.guild.id}`) === null || client.db["perm"].get(`permkick_user_${message.guild.id}`) === undefined || client.db["perm"].get(`permkick_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dpermKick}`);

                client.db["perm"].set(`permkick_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.apermKick}`);
            }
        
            if(args[0] === "gw"){
                if(client.db["perm"].get(`permgw_user_${message.guild.id}`) === null || client.db["perm"].get(`permgw_user_${message.guild.id}`) === undefined || client.db["perm"].get(`permgw_user_${message.guild.id}`) === []) return message.channel.send(`${lang.rperm.dpermGw}`);

                client.db["perm"].set(`permgw_user_${message.guild.id}`, []).save();
                message.channel.send(`${lang.rperm.apermGw}`);
            }
        }
    }
}