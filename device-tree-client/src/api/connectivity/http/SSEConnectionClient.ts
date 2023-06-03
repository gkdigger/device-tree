import { config } from "../../../config";
import IConnectionClient from "../IConnectionClient";

export default class SSEConnectionClient implements IConnectionClient {
    connect(callback: (data: any) => void): void {
        const events = new EventSource(`${config.protocol}://${config.host}:${config.port}/events`);
        events.onmessage = (event) => {
            console.log(event);
            if (event.data) {
                callback(JSON.parse(event.data));
            } else {
                callback(null);
            }
        };
    }

}
