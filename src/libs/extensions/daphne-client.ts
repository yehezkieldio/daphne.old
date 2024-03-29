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
            container.logger.info(
                "DaphneClient: Default behavior for application commands registries are set to BulkOverwrite."
            );
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }

        if (options.analytics) {
            container.logger.info("DaphneClient: Analytics enabled, attempting connection test...");
            container.analytics = new AnalyticsClient();

            container.analytics
                .test()
                .then((result) => {
                    container.logger.info("DaphneClient: Analytics connection test successful!");
                })
                .catch((error) => {
                    container.logger.error("DaphneClient: Analytics connection test failed!");
                });
        }
    }
}

declare module "@sapphire/pieces" {
    interface Container {
        analytics: AnalyticsClient;
    }
}
