import { DaphneEvents } from "@/typings/events";
import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: DaphneEvents.ClientReady,
        });
    }

    public async run(client: Client) {
        const { username, id } = client.user!;
        this.container.logger.info(`ReadyListener: Successfully logged in as ${username} (${id})`);
    }
}
