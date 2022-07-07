const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "addperm", 
    aliases: ["addperms"],
    description: "Ajouter un utilisateur ou un rôle à un permission", 
    usage:"-addperm <1/2/3/4/ban/kick/gw> <user/role>", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
        if(message.guild.ownerId === message.author.id || client.config.owners.includes(message.author.id)){
            if(!args.length) return message.channel.send(`${lang.gperm.dperm} : \`1/2/3/4/ban/kick\` `); 

            if(args[0] === "1"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);

                if(client.db["perm"].get(`perm1_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dperm1}`); 

                client.db["perm"].push(`perm1_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.aperm1}`);
            }
            if(args[0] === "2"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);

                if(client.db["perm"].get(`perm2_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dperm2}`); 

                client.db["perm"].push(`perm2_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.aperm2}`);
            }
            if(args[0] === "3"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(client.db["perm"].get(`perm3_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dperm3}`); 

                client.db["perm"].push(`perm3_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.aperm3}`);
            }
            if(args[0] === "4"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(client.db["perm"].get(`perm4_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dperm4}`); 
    
                client.db["perm"].push(`perm4_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.aperm4}`);
            }
            if(args[0] === "ban"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(client.db["perm"].get(`permban_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dpermBan}`); 
                client.db["perm"].push(`permban_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.apermBan}`);
            }
            if(args[0] === "kick"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(client.db["perm"].get(`permkick_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dpermKick}`); 

                client.db["perm"].push(`permkick_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.apermKick}`);
            }
            if(args[0] === "gw"){
                let index = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
                if(!index) return message.channel.send(`${lang.gperm.userV}`);
                
                if(client.db["perm"].get(`permgw_user_${message.guild.id}`)?.includes(index.id)) return message.channel.send(`${lang.gperm.dpermGw}`); 

                client.db["perm"].push(`permgw_user_${message.guild.id}`, index.id).save();
                message.channel.send(`<@${index.id}> ${lang.gperm.apermGw}`);
            }
        }
    }
}