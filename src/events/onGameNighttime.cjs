const {promisify} = require("util");

module.exports = function(client){
    client.on("gameNighttime", async (firstNight, guildID, channelID ) => {
        const outputChannel = channelID ? client.guilds.cache.get(guildID).channels.cache.find((channel) => {
            return channel.name.split("-")[2] == channelID
        }) : client.guilds.cache.get(guildID).channels.cache.find((channel) => {return channel.name == "tos-channel"});

        const mafiaChannel = channelID ? client.guilds.cache.get(guildID).channels.cache.find((channel) => {
            return channel.name.split("-")[3] == channelID
        }) : client.guilds.cache.get(guildID).channels.cache.find((channel) => {return channel.name == "mafia-tos-channel"});

        const gameCache = client.games.get(guildID).get(channelID);
        let time = 45;
        let aliveMafiaPlayerIDs = gameCache.inGameRoles.filter(player => player.faction == "Mafia" && player.alive == true).map(player => player.id);

        const mafiaWritePermissions = [];
        for (const playerID of aliveMafiaPlayerIDs){
            mafiaWritePermissions.push(mafiaChannel.permissionOverwrites.edit(playerID, {
                SEND_MESSAGES: true
            }));
        }

        await Promise.all(mafiaWritePermissions);

        let messages = [];
        if (firstNight){
            for (let player of gameCache.inGameRoles){
                if (!player.alive) continue;

                
                
            }
        }
        setTimeout(() => {
            client.emit("gameDaytime", false, guildID, channelID);
        }, 45000)
        
        const interval = setInterval(async () => {
            if (!(--time)){
                const denyMafiaWritePermissions = [];
                for (const playerID of aliveMafiaPlayerIDs){
                    mafiaWritePermissions.push(mafiaChannel.permissionOverwrites.edit(playerID, {
                        SEND_MESSAGES: false
                    }));
                }

                await Promise.all(denyMafiaWritePermissions);
                
                client.emit("gameDaytime", false, guildID, channelID)
                clearInterval(interval);
            }
        }, 1000);
    });
}