module.exports = function(client){
    client.on("interactionCreate", async (interaction) => {
        
        if (!interaction.isCommand()) return;

        await interaction.deferReply();

        var params = [];
        const options = interaction.options.data;
        const scriptToRun = client.commands.get(interaction.commandName).execute;

        for (let option in options){
            switch (option.type){
                case "SUB_COMMAND":
                    break;
                case "USER":
                    params.push(interaction.guild.members.cache.get(option.user.id));
                    break;
                default:
                    params.push(option.value);
                    break;
            }
        }
        
        try {
            await scriptToRun(client, interaction, params);
        } catch (e){
            console.log(e);
        }
    });
}