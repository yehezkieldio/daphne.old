import { env } from "@/env";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

export class AnalyticsClient extends InfluxDB {
    public constructor() {
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

    public test() {
        return this.queryApi.queryRaw("buckets()");
    }
}
