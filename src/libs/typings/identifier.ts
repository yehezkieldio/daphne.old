import { Identifiers as SapphireIdentifiers } from "@sapphire/framework";

enum Identifiers {
    RegisteredUserOnly = "RegisteredUserOnly",
    DeveloperOnly = "DeveloperOnly",
    SearchResultsNotFound = "SearchResultsNotFound",
}

export const DaphneIdentifiers = {
    ...SapphireIdentifiers,
    ...Identifiers,
} as const;
