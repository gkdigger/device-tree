import IConnection from "./IConnection";
import HTTPConnection from "./http/HTTPConnection";
import DummyConnection from "./DummyConnection";

export default class ConnectionManager {
    static createConnection(type: string) : IConnection {
        let connection = null;
        if (type === "http") {
            connection = new HTTPConnection();
        } else {
            connection = new DummyConnection();
        }

        return connection;
    }
}
