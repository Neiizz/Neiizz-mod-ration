const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
//const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: "0",
    description: "Ouvre un pannel de config",
    usage: "<prefix>config",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:NoCheck:979096824109498462> \`Erreur\` Vous n'avez pas les permissions pour utiliser cette commande");


        let antilink = client.db["protect"].get(`antilink_${message.guild.id}`);
            if(antilink === "on") antilink = "\`✅\`";
            if(antilink === "off") antibot = "\`❌\`";
            if(antilink === undefined || antilink === null) antilink = "\`❌\`";

        //BUTTON ANTIRAID
        const row3 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("onn")
            .setLabel("Configuration membre")
            .setEmoji("🔒")
            .setStyle("PRIMARY"), 
            new Discord.MessageButton()
            .setCustomId("off")
            .setLabel("Configuration serveur")
            .setEmoji("📋")
            .setStyle("PRIMARY"), 
        ); 
        const row4 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("AlOn")
            .setLabel("Anti-link")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("AlOff")
            .setLabel("Anti-Spam")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("rtr")
            .setLabel("Retour")
            .setStyle("PRIMARY"),
        )
        const row5 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("abot")
            .setLabel("Anti-Bot")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("arole")
            .setLabel("Anti-Roles")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("rtr")
            .setLabel("Retour")
            .setStyle("PRIMARY"),
        )
        const row6 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("ac1")
            .setLabel("Activé")
            .setStyle("SUCCESS"),
            new Discord.MessageButton()
            .setCustomId("ac2")
            .setLabel("Desactivé")
            .setStyle("DANGER"),
            new Discord.MessageButton()
            .setCustomId("rtr1")
            .setLabel("Retour")
            .setStyle("PRIMARY"),
        )
        const row7 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("ac333")
            .setLabel("Punish")
            .setStyle("PRIMARY")
            .setDisabled(true),
            new Discord.MessageButton()
            .setCustomId("ac3")
            .setLabel("Kick")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("ac4")
            .setLabel("Ban")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("ac5")
            .setLabel("Derank")
            .setStyle("SECONDARY"),
        )
        

        //EMBED DE BASE
        let embed = new Discord.MessageEmbed()
        .setTitle('Configuration')
        .setDescription(`1 - config membres \n2 - config serveur`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('WHITE');
       

        message.channel.send({embeds : [embed], components: [row3]}).then((msgembed) => {
            const filter = (interaction) => interaction.user.id === message.author.id;
            const col = message.channel.createMessageComponentCollector({filter, componentType: "BUTTON", time: 320000});

        col.on("collect", async(c) => {
            c.deferUpdate();
            const val = c.customId;

            //ANTI BOT
            if(val === "onn"){
                embed.setTitle(`Protection des membres`)
                embed.setDescription(`test`); 
                msgembed.edit({embeds : [embed], components: [row4] }); 
            }
            if(val === "off"){

                embed.setTitle(`Protection du serveur`)
                embed.setDescription(`cc`); 
                msgembed.edit({embeds : [embed], components: [row5] }); 
            } 
            if(val === "rtr"){
                embed.setTitle('Configuration')
                embed.setDescription(`1 - config membres \n2 - config serveur`)
                msgembed.edit({embeds : [embed], components: [row3] }); 
            }
            if(val === "rtr1"){
                embed.setTitle('Protection des membres')
                embed.setDescription(`test`)
                msgembed.edit({embeds : [embed], components: [row4] }); 
            }
            if(val === "AlOn"){
                embed.setTitle(`Anti-Link`)
                embed.setDescription(`- \n-`); 
                msgembed.edit({embeds : [embed], components: [row6, row7] });
            }
            if(val === "ac1"){
                embed.setTitle(`Anti-Link`)
                embed.setDescription(`**Anti-Link:** ${antilink} \n-`); 
                msgembed.edit({embeds : [embed], components: [row6, row7] });
            }
            if(val === "ac2"){
                embed.setTitle(`Anti-Link`)
                embed.setDescription(`**Anti-Link:** ${antilink} \n-`); 
                msgembed.edit({embeds : [embed], components: [row6, row7] });
            }

        })
    }) 

    }
}
