import IConnection from "./IConnection";
import { IUsbConnectionListener } from "./usb/UsbConnectionMonitor";

export default class DummyConnection implements IConnection {
    get usbConnectionListener(): IUsbConnectionListener {
        throw new Error("Method not implemented.");
    }
    connect(): void {
        console.log("Dummy connection");
    }
}