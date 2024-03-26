import { DaphneCommand } from "@/extensions/daphne-command";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";

export class PingCommand extends DaphneCommand {
    public constructor(context: DaphneCommand.Context, options: DaphneCommand.Options) {
        super(context, {
            name: "ping",
            description: "Ping bot to see if it is alive.",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: DaphneCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: DaphneCommand.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }

        return interaction.editReply("Failed to retrieve ping :(");
    }
}
