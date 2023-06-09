import { config } from "./config";
import ConnectionManager from "./services/connection/ConnectionManager";
import UsbConnectionMonitor from "./services/connection/usb/UsbConnectionMonitor";

const connectionInstance = ConnectionManager.createConnection(config.connectionType);
const usbConnectionMonitor = new UsbConnectionMonitor();
connectionInstance.connect();
usbConnectionMonitor.start();