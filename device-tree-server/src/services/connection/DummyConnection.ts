import IConnection from "./IConnection";

export default class DummyConnection implements IConnection {
    connect(): void {
        console.log("Dummy connection");
    }
}