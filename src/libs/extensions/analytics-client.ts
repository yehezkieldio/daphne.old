import { env } from "@/env";
import { InfluxDB } from "@influxdata/influxdb-client";

export class AnalyticsClient extends InfluxDB {
    private static instance: AnalyticsClient;

    private constructor() {
        super({
            url: env.INFLUXDB_URL,
            token: env.INFLUXDB_TOKEN,
        });
    }

    public get writeApi() {
        return this.getWriteApi(env.INFLUXDB_ORG, env.INFLUXDB_BUCKET);
    }

    public get queryApi() {
        return this.getQueryApi(env.INFLUXDB_ORG);
    }

    public get bucket() {
        return env.INFLUXDB_BUCKET;
    }

    public get org() {
        return env.INFLUXDB_ORG;
    }

    /**
     * We use a singleton pattern to ensure that we only have one instance of the client.
     * This is because the client is stateful and we want to ensure that we are not creating
     * multiple connections to the InfluxDB server.
     */
    public static getInstance(): AnalyticsClient {
        if (!AnalyticsClient.instance) {
            AnalyticsClient.instance = new AnalyticsClient();
        }
        return AnalyticsClient.instance;
    }
}
