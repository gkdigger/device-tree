import { IUsbConnectionListener } from "./usb/UsbConnectionMonitor";
export default interface IConnection {
    connect(): void;
    get usbConnectionListener() : IUsbConnectionListener;
}