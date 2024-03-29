import { DaphneEvents } from "@/typings/events";
import { Listener, type ChatInputCommandAcceptedPayload } from "@sapphire/framework";

export class ChatInputCommandAcceptedListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: DaphneEvents.ChatInputCommandAccepted,
        });
    }

    public async run(payload: ChatInputCommandAcceptedPayload) {}
}
