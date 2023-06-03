import IConnectionClient from "./IConnectionClient";
import SSEConnectionClient from "./http/SSEConnectionClient";
import DummyConnectionClient from "./DummyConnectionClient";

export default class ConnectionClientManager {
    static createConnection(type: string) : IConnectionClient {
        let connection = null;
        if (type === "http") {
            connection = new SSEConnectionClient();
        } else {
            connection = new DummyConnectionClient();
        }

        return connection;
    }
}
