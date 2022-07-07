const Discord = require('discord.js'); 
const {bot} = require('../../structures/client'); 
const {exec} = require('child_process'); 

module.exports = {
    name: "configdev", 
    aliases: [],  
    /**
     * 
     * @param {bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(client.config.dev.includes(message.author.id)){

        let color = await client.db["color"].get(`theme`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        message.delete()

        const row3 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("stop")
            .setLabel("1️⃣")
            .setStyle("SECONDARY"),  
            new Discord.MessageButton()
            .setCustomId("redem")
            .setLabel("2️⃣")
            .setStyle("SECONDARY"),  
        ); 

        const embed = new Discord.MessageEmbed()
        .setTitle(`Pannel Dev Bot`)
        .setDescription(`**Développeur(s):** \n<@${client.config.dev.join("\n- ")}> `)
        .addField(`1・Stop`, `Arreté le bot`)
        .addField(`2・Restart`, `Redémarré le bot`)
        .addField(`3・`, `soon`)
        .setColor(color || client.config.color)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTimestamp()

        message.channel.send({ embeds: [embed], components: [row3] }).then((msgembed) => {
            const filter = (interaction) => interaction.user.id === message.author.id;
            const col = message.channel.createMessageComponentCollector({filter, componentType: "BUTTON", time: 320000});

            col.on("collect", async(c) => {
                c.deferUpdate();
                const val = c.customId;
    
                if(val === "stop"){
    
                    message.channel.send(` \`\`\` 1️⃣・STOP \`\`\` Le bot va s'éteindre d'ici 20 secondes.`).then(() => {
                        setTimeout(() => {
                        client.destroy();
                        }, 20000)
                    })
                }
                if(val === "redem"){
    
                    message.channel.send(` \`\`\` 2️⃣・RESTART \`\`\` Le bot va redémarré d'ici 15 secondes.`).then(() => {
                        setTimeout(() => {
                        require("child_process").execSync("node index.js") 
                        message.channel.send(`Bot en ligne`); 
                        }, 15000)
                    })
                }
    
            })

        })
        }
    }
}