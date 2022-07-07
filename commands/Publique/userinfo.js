const Discord = require('discord.js');
const { Database } = require('luma-db-v2');
const { Bot } = require('../../structures/client');
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    description: "envois les info d'un utilisateur",
    usage: "<prefix>userinfo",
    categorie: "public",
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, lang) => {
      

        try {
            let user;
            if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
                user = message.user ? await client.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await client.users.fetch(args[0]))
                if(!user) return message.reply("Aucune personne trouvée !")
            } else user = message.user ? message.user : message.author;
            let member = message.guild.members.cache.get(user.id)


            const Statusfilter = {online: `<:status_online:978726290448343090> ${lang.uinfo.online}`, idle: `<:status_idle:978726224736186399> ${lang.uinfo.idle}`, dnd: `<:status_dnd:978726179769057350> ${lang.uinfo.dnd}`, offline: `<:status_offline:978726151939817523> Hors-ligne`, undefined: `<:status_offline:978726151939817523> ${lang.uinfo.offline}`}

            const activity = member.presence ? member.presence.activities[0] : {
                type: "CUSTOM",
                emoji: {
                  name: "❌"
                },
                state : "Aucun - Hors Ligne."
              };

            var userstatus = `Aucun`;
            if(activity){
              if(activity.type === "CUSTOM"){
                userstatus = ` ${activity.state || `Aucune.` }`
              }
              else{
                userstatus = `${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}`
              }
            }

            const activities = [];
            let customStatus;
            for (const activity of member.presence.activities.values()) {
              switch (activity.type) {
                case 'PLAYING':
                  activities.push(`Joue à **${activity.name}**`);
                  break;
                case 'LISTENING':
                  if (member.user.bot) activities.push(` Ecoute **${activity.name}**`);
                  else activities.push(` Ecoute **${activity.details}** de **${activity.state}**`);
                  break;
                case 'WATCHING':
                  activities.push(`Regarde **${activity.name}**`);
                  break;
                case 'STREAMING':
                  activities.push(`Stream **${activity.name}**`);
                  break;
                case 'CUSTOM_STATUS':
                  customStatus = activity.state;
                  break;
              }
            }

            const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

            const flags = {
                DISCORD_EMPLOYEE: 'Discord Employee',
                DISCORD_PARTNER: '<:Partner:978717939010269244> Discord Partner',
                BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
                BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
                HYPESQUAD_EVENTS: '<:HypeSquadEvents:978717438348771409> HypeSquad Events',
                HOUSE_BRAVERY: '<:HypeSquadBravery:978717268953415680> House of Bravery',
                HOUSE_BRILLIANCE: '<:hypesquadbriliance:978717329028431934> House of Brilliance',
                HOUSE_BALANCE: '<:HypesquadBalance:978717300163223562> House of Balance',
                EARLY_SUPPORTER: '<:early:978717228973293698> Early Supporter',
                TEAM_USER: 'Team User',
                SYSTEM: 'System',
                VERIFIED_BOT: '<:VerifiedBot:978717183045697656> Verified Bot',
                VERIFIED_DEVELOPER: '<:VerifiedBotDev:969641212199977010> Verified Bot Developer'
            };


            let embed = new Discord.MessageEmbed()
            .addFields([
                {name: `**${lang.uinfo.Surnom} :**`, value: `\`${member.nickname || "Aucun."}\``, inline: true },
                {name: `**${lang.uinfo.Pseudo} :**`, value: `\`${user.username}\``, inline: true},
                {name: `**${lang.uinfo.id} :**`, value: `\`${user.id}\``, inline: true},
            ])
            .addField(`**${lang.uinfo.Statut} :**`, ` ${userstatus} `)
            .addField(`**${lang.uinfo.Presence} :**`, ` ${Statusfilter[member.presence?.status]} `)
            .addField(`**${lang.uinfo.Badge} :**`, ` ${(await member.user.fetchFlags()).toArray().length ? member.user.flags.toArray().map(flag => flags[flag]).join(', ') : 'Aucun.'} `)
            .addField(`**${lang.uinfo.Compte} :**`, ` \`${moment(member.user.createdAt).format('DD/MM/YYYY à HH:mm')}\` (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>) `)
            .addField(`**${lang.uinfo.Present} :**`, ` \`${moment(member.joinedTimestamp).format('DD/MM/YYYY à HH:mm')}\` (<t:${parseInt(member.joinedTimestamp / 1000)}:R>) `)
            //.addField(`**Roles (${roles.length}) :**`, ` ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Aucun'} `) //c bug
            embed.setImage(await (await client.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({ text: `${client.config.footer}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor(member.displayHexColor)
            if (activities.length > 0) embed.addField(`**Activité :**`, `${activities.join('\n')}`);
            if (customStatus) embed.spliceFields(0, 0, { name: 'Statut personnalisé', value: customStatus});

            message.reply({allowedMentions: { repliedUser: false }, embeds: [embed] })

        } catch (err) {
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ERREUR▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
            console.log(`[Error] : ${err}`)
            console.log(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
            return message.reply(` ${lang.uinfo.err} `)
        }  

    }
}