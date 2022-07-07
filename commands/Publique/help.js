const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
const simplydjs = require('simply-djs')

module.exports = {
    name: "help",
    aliases: [" "],
    description: "page d'aide du bot",
    usage: "<prefix>help",
    categorie: "public",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
        let color = await client.db["color"].get(`theme_${message.guild.id}`); 
            if(color === null || color === undefined) color = `${client.config.color}`;

        let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix

        let perm3 = client.commands.filter(a => a.categorie === "perm3").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let perm4 = client.commands.filter(a => a.categorie === "perm4").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let mod = client.commands.filter(a => a.categorie === "mod").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let param = client.commands.filter(a => a.categorie === "param").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let public = client.commands.filter(a => a.categorie === "public").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let fun = client.commands.filter(a => a.categorie === "fun").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")
        let util = client.commands.filter(a => a.categorie === "util").map(cmd => `[\`${cmd.name}\`](https://discord.com/terms)`).join(", ")




        if(!args.length){

        let acc = new Discord.MessageEmbed()
        .setTitle(`${lang.help.titleac} ${client.user.username}`)
        .setDescription(`**${message.author.tag}** ${lang.help.descac} \n\n**${lang.help.descac1}** \n> ${lang.help.descac2} \`${lang.help.descac3}\` \n> ${lang.help.descac4} \`${prefix}\` \n\n**Variables:** \n> Variable obligatoire: \`<...>\` \n> Variable facultatives: \`[...]\`  \n\n**${lang.help.descac6}** \n> [${lang.help.descac7}](${client.config.linkBot}) • [Support](${client.config.supportBot}) `)
        .setImage(client.config.ebimg)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let paramm = new Discord.MessageEmbed()
        .setTitle(`〃 Paramètres`)
        .addField(`\`${prefix}owner <user>\` `, `**Voir les owners du bot sur le serveur et en ajouter**`)
        .addField(`\`${prefix}unowner <user>\` `, `**Enlever un utilisateur des owners du bot**`)
        .addField(`\`${prefix}clear owners\` `, `**Enlever tout les owners**`)
        .addField(`\`${prefix}blacklist <user>\` `, `**Ban **`)
        .addField(`\`${prefix}perm\` `, `**Voir la liste des personnes se trouvant dans les différentes perms**`)
        .addField(`\`${prefix}addperm <user> <1/2/3/4/ban/kick>\` `, `**Ajouter un utilisateur ou un rôle à un permission**`)
        .addField(`\`${prefix}removeperm <user> <1/2/3/4/ban/kick>\` `, `**Retirer un utilisateur d'une perm**`)
        .addField(`\`${prefix}resetperm <1/2/3/4/ban/kick>\` `, `**Retirer tous les membres qui ont accès à une permission spécifique**`)
        .addField(`\`${prefix}set theme <couleur>\` `, `**Changer le thème des embeds**`)
        .addField(`\`${prefix}setname <name>\` `, `**Changer le nom du bot**`)
        .addField(`\`${prefix}setpic <lien/image>\` `, `**Changer la photo de profil du bot**`)
        .addField(`\`${prefix}setActivity <streaming/watching/playing/listening/competing>\` `, `**Changer l'activité du bot**`)
        .addField(`\`${prefix}setprefix <prefix>\` `, `**Changer le prefixe du bot**`)
        .addField(`\`${prefix}serverlist\` `, `**Voir les serveurs du bot**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let antir = new Discord.MessageEmbed()
        .setTitle(`〃 Antiraids`)
        .addField(`\`${prefix}pinfo\` `, `**Voir la liste des protections disponnible**`)
        .addField(`\`${prefix}punish <protect> <ban/kick/derank>\` `, `**Changer les punitions pour chacunes des protections du bot**`)
        .addField(`\`${prefix}secur [on/off/max]\` `, `**Voir toutes les protections du bot sur le serveur**`)
        .addField(`\`${prefix}antilink <on/off/max>\` `, `**Empêcher les liens sur le serveur**`)
        .addField(`\`${prefix}antispam <on/off/max>\` `, `**Empêcher le spam sur le serveur**`)
        .addField(`\`${prefix}antiwebhook <on/off/max>\` `, `**Empêcher les créations de webhooks sur le serveur**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let log = new Discord.MessageEmbed()
        .setTitle(`〃 Logs`)
        .addField(`\`${prefix}channellogs <on/off> [salon]\` `, `**Activer ou désactiver les logs des salons crée/supprimés/modifiés**`)
        .addField(`\`${prefix}messagelogs <on/off> [salon]\` `, `**Activer ou désactiver les logs des message supprimés/modifiés**`)
        .addField(`\`${prefix}modlogs <on/off> [salon]\` `, `**Activer ou désactiver les logs des modérations**`)
        .addField(`\`${prefix}rolelogs <on/off> [salon]\` `, `**Activer ou désactiver les logs des roles crée/supprimés/modifiés**`)
        .addField(`\`${prefix}presetlogs\` `, `**Crée une categorie pour les logs**`)
        .addField(`\`${prefix}logs <info/off>\` `, `**Affiche les logs activé / désactivé tous les logs**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let mod = new Discord.MessageEmbed()
        .setTitle(`〃 Modérations`)
        .addField(`\`${prefix}ban <user> [raison]\` `, `**Bannir un utilisateur sur le serveur**`)
        .addField(`\`${prefix}unban <user> [raison]\` `, `**Révoquer le bannissement d'un utilisateur sur le serveur**`)
        .addField(`\`${prefix}banlist\` `, `**Voir la listes de tout les utilisateurs ban**`)
        .addField(`\`${prefix}kick <user> [raison]\` `, `**Expulser un utilisateur du serveur**`)
        .addField(`\`${prefix}lock [all]\` `, `**Vérouiller un salon ou tous les salons du serveur**`)
        .addField(`\`${prefix}unlock [all]\` `, `**Dévérouiller un salon ou tous les salons d'un serveur**`)
        .addField(`\`${prefix}renew\` `, `**Recréé un salon au même endroit avec les mêmes permissions**`)
        .addField(`\`${prefix}mute <user> <temps> [raison]\` `, `**Timeout un utilisateur sur le serveur**`)
        .addField(`\`${prefix}unmute <user>\` `, `**Ne plus exclure une personne exclue sur le serveur**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let utils = new Discord.MessageEmbed()
        .setTitle(`〃 Utilitaires`)
        .addField(`\`${prefix}embed\` `, `**Permet de crée un embed**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let inf = new Discord.MessageEmbed()
        .setTitle(`〃 Informations`)
        .addField(`\`${prefix}botinfo\` `, `**Voir les informations du client**`)
        .addField(`\`${prefix}credits\` `, `**Voir les crédits du bot**`)
        .addField(`\`${prefix}help [all]\` `, `**Pages d'aide du bot**`)
        .addField(`\`${prefix}ping\` `, `**Voir la latence du client**`)
        .addField(`\`${prefix}roleinfo <role>\` `, `**Voir les informations sur un rôle**`)
        .addField(`\`${prefix}serverinfo\` `, `**Voir les informations du serveur**`)
        .addField(`\`${prefix}userinfo <user>\` `, `**Voir les informations d'un utilisateur**`)
        .addField(`\`${prefix}snipe\` `, `**Voir le dernier message supprimé**`)
        .addField(`\`${prefix}banner [user]\` `, `**Permet d'afficher la bannière d'un utilisateur.**`)
        .addField(`\`${prefix}pic [user]\` `, `**Permet de voir la photo de profil d'un utilisateur.**`)
        .addField(`\`${prefix}server <banner/pic>\` `, `**Voir la bannière/pdp du serveur**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let fn = new Discord.MessageEmbed()
        .setTitle(`〃 Fun`)
        .addField(`\`${prefix}snake\` `, `**Jouer une partie de snake**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()


        let pages = [acc, paramm, antir, log, mod, utils, inf, fn]

        simplydjs.embedPages(message, pages, {
            firstEmoji: "▶",
            backEmoji: "◀",
            btncolor: "SECONDARY",
            //skipBtn: false,
           // delBtn: false,
            skips: false,
            delete: false,
            buttons: {
                nextBtn: {
                    style: 'SECONDARY',
                    emoji: '▶',
                    label: 'Next'
                },
                backBtn: {
                    style: 'SECONDARY',
                    emoji: '◀',
                    label: 'Back',
                }

            }

        }); 

    }
    else if(args[0] === "all"){

        const embed = new Discord.MessageEmbed()
        .setTitle(`**${lang.help.cmdDispo}**`)
        .setDescription(`Je possède \`${client.commands.size}\` commandes \nMon préfixe est \`${prefix}\``)
        .addFields( {
            name: `〃 **Paramètre**`,
            value: ` ${param}`,
            inline: false,
        }, {
            name: `〃 **Antiraid**`,
            value: `${perm4} `,
            inline: false,
        }, {
            name: `〃 **Modérations**`,
            value: `${mod}`,
            inline: false,
        }, {
            name: `〃 **Logs**`,
            value: `${perm3} `,
            inline: false,
        }, {
            name: `〃 **Utilitaires**`,
            value: `${util} `,
            inline: false,
        }, {
            name: `〃 **Informations**`,
            value: `${public}`,
            inline: false,
        }, {  
            name: `〃 **Fun**`,
            value: `${fun}`,
            inline: false,
        }, )
        .setColor(color || client.config.color)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        message.reply({allowedMentions: { repliedUser: false }, embeds: [embed] })
    }
    else if(args[0] === "perm"){

        let acc = new Discord.MessageEmbed()
        .setTitle(`${lang.help.titleac} ${client.user.username}`)
        .setDescription(`**${message.author.tag}** ${lang.help.descac} \n\n**${lang.help.descac1}** \n> ${lang.help.descac2} \`${lang.help.descac3}\` \n> ${lang.help.descac4} \`${prefix}\` \n\n> ${lang.help.descac5} \n\n**${lang.help.descac6}** \n> [${lang.help.descac7}](${client.config.linkBot}) • [Support](${client.config.supportBot}) `)
        .setImage(client.config.ebimg)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        let perm4 = new Discord.MessageEmbed()
        .setTitle(`PERM 4`)
        .addField(`\`${prefix}secur\` `, `**Voir/gérer toutes les protections du bot sur le serveur**`)
        .addField(`\`${prefix}punish <permissions> <ban/kick/derank>\` `, `**Changer les punitions pour chacunes des protections du bot**`)
        .addField(`\`${prefix}pinfo\` `, `**Voir toutes les protections disponnible**`)
        .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setColor(color || client.config.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()


        let pages = [acc, perm4]

        simplydjs.embedPages(message, pages, {
            firstEmoji: "▶",
            backEmoji: "◀",
            btncolor: "SECONDARY",
            //skipBtn: false,
           // delBtn: false,
            skips: false,
            delete: false,
            buttons: {
                nextBtn: {
                    style: 'SECONDARY',
                    emoji: '▶',
                    label: 'Next'
                },
                backBtn: {
                    style: 'SECONDARY',
                    emoji: '◀',
                    label: 'Back',
                }

            }

        }); 

    } 

    }
}