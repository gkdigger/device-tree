import IConnectionClient from "./IConnectionClient";

export default class DummyConnection implements IConnectionClient {
    connect(): void {
        console.log("Dummy connection");
    }
}