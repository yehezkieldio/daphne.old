import { AnalyticsClient } from "@/extensions/analytics-client";
import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    container,
    type SapphireClientOptions,
} from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export interface DaphneClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
    analytics?: boolean;
}

export class DaphneClient extends SapphireClient {
    public constructor(options: DaphneClientOptions) {
        super(options);

        if (options.overrideApplicationCommandsRegistries) {
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }

        if (options.analytics) {
            container.logger.info(
                "Enabling InfluxDB analytics client, please ensure that the required environment variables are set."
            );
            container.analytics = AnalyticsClient.getInstance();
        }
    }
}

declare module "@sapphire/pieces" {
    interface Container {
        analytics: AnalyticsClient;
    }
}
