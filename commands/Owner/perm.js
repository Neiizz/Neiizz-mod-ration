const Discord = require('discord.js');
const {bot} = require('../../structures/client');

module.exports = {
    name: "perm", 
    description: "Voir la liste des personnes se trouvant dans les différentes perms", 
    usage: "-perm", 
    categorie: "param",
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.guild.ownerId === message.author.id || client.config.owners.includes(message.author.id)){
            let perm1 = client.db["perm"].get(`perm1_user_${message.guild.id}`); 
            let perm2 = client.db["perm"].get(`perm2_user_${message.guild.id}`);
            let permban = client.db["perm"].get(`permban_user_${message.guild.id}`);
            let permkick = client.db["perm"].get(`permkick_user_${message.guild.id}`);
            let perm3 = client.db["perm"].get(`perm3_user_${message.guild.id}`);
            let perm4 = client.db["perm"].get(`perm4_user_${message.guild.id}`);
            let permgiveaway = client.db["perm"].get(`permgw_user_${message.guild.id}`);
            if(perm1 === null || perm1 === undefined || !perm1 || perm1 === []) {
                perm1 = "-"
            } else {
                perm1 = client.db["perm"].get(`perm1_user_${message.guild.id}`).map(function(perm) {return `<@${perm}>`}).join(", ");
            }
            if(perm2 === null || perm2 === undefined || !perm2 || perm2 === []) {
                perm2 = "-";
            } else {
                perm2 = client.db["perm"].get(`perm2_user_${message.guild.id}`).map(function(perm) {return `<@${perm}>`}).join(", ");
            }
            if(perm3 === null || perm3 === undefined || !perm3 || perm3 === []) {
                perm3 = "-";
            } else {
                perm3 = client.db["perm"].get(`perm3_user_${message.guild.id}`).map(function(perm){return `<@${perm}>`}).join(", ");
            }
            if(permban === null || permban === undefined || !permban || permban === []) {
                permban = "-";
            } else {
                permban = client.db["perm"].get(`permban_user_${message.guild.id}`).map(function(perm) {return `<@${perm}>`}).join(", ");
            }
            if(permkick === null || permkick === undefined || !permkick || permkick === []) {
                permkick = "-";
            } else {
                permkick = client.db["perm"].get(`permkick_user_${message.guild.id}`).map(function(perm) {return `<@${perm}>`}).join(", ");
            }
            if(permgiveaway === null || permgiveaway === undefined || !permgiveaway || permgiveaway === []) {
                permgiveaway = "-";
            } else {
                permgiveaway = client.db["perm"].get(`permgw_user_${message.guild.id}`).map(function(perm){return `<@${perm}>`}).join(", ");
            }
            if(perm4 === null || perm4 === undefined || !perm4 || perm4 === []){
                perm4 = "-";
            } else {
                perm4 = client.db["perm"].get(`perm4_user_${message.guild.id}`).map(function(perm){return `<@${perm}>`}).join(", ");
            }

            let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

            let embed = new Discord.MessageEmbed()
            .addFields([
                {name: `Permission 1`, value: `${perm1 || "-"}`, inline: false},
                {name: `Permission 2`, value: `${perm2 || "-"}`, inline: false},
                {name: `Permission 3`, value: `${perm3 || "-"}`, inline: false},
                {name: `Permission 4`, value: `${perm4 || "-"}`, inline: false},
               // {name: `Permission Giveaway`, value: `${permgiveaway || "-"}`, inline: false},
                {name: `Permission Ban`, value: `${permban || "-"}`, inline: false}, 
                {name: `Permission Kick`, value: `${permkick || "-"}`, inline: false}
            ])
            .setColor(color || client.config.color)
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })

            message.reply({allowedMentions: { repliedUser: false }, embeds: [embed] })
        }
    }
}