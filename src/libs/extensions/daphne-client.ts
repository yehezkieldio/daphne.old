import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    type SapphireClientOptions,
} from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export interface DaphneClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
}

export class DaphneClient extends SapphireClient {
    public constructor(options: DaphneClientOptions) {
        super(options);

        if (options.overrideApplicationCommandsRegistries) {
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }
    }
}
