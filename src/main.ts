import "@sapphire/plugin-logger/register";
import { DaphneClient } from "@/extensions/daphne-client";
import { configuration } from "./configuration";
import { env } from "./env";

/**
 * The main entry point for the bot.
 * @see DaphneClient
 */
const main = async (): Promise<void> => {
    void new DaphneClient(configuration).login(env.DISCORD_BOT_TOKEN);
};

void main();
