import "@sapphire/plugin-logger/register";
import { DaphneClient } from "@/extensions/daphne-client";
import { configuration } from "./configuration";
import { env } from "./env";

const main = async (): Promise<void> => {
    void new DaphneClient(configuration).login(env.DISCORD_BOT_TOKEN);
};

void main();
