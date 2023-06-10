import { usb } from "usb"
import { Device, Devices } from "../../../model/Devices";

interface IUsbConnectionListener {
    deviceAdded(deviceId: number): void;
    deviceRemoved(deviceId: number) : void;
}

class UsbConnectionMonitor {
    private connectedDevices = Devices.getSharedInstance();
    private _listeners: Set<IUsbConnectionListener>;
    constructor() {
        this._listeners = new Set<IUsbConnectionListener>();

        usb.useUsbDkBackend();
        usb.on("attach", async (device) => {
            // await this.addDevice(device);
            await this.getConnectedDevices();
            this._listeners.forEach((listener) => {
                listener.deviceAdded(device.deviceAddress);
            });
    
        });
        usb.on("detach", async (device) => {
            // this.connectedDevices.deleteDevice(device.deviceAddress);
            await this.getConnectedDevices();
            this._listeners.forEach((listener) => {
                listener.deviceRemoved(device.deviceAddress);
            });    
        });
    }

    private getDescriptorStringValue(device: usb.Device, descriptor_index: number)  {
        return new Promise<string>((resolve, reject) => {
            try {
                device.getStringDescriptor(descriptor_index, (error, value) => {                   
                    if (!error) {
                        resolve(value);
                    } else {
                        reject(error);
                    }
                });
                    
            } catch (err) {
               reject(err); 
            }
        });
    }

    private async getConnectedDevices() {
        const deviceList = usb.getDeviceList();
        this.connectedDevices.reset();
        for (const device of deviceList) {
             await this.addDevice(device);
        }
    }
    public async start() {
        await this.getConnectedDevices();
    }
    
    private async addDevice(device: usb.Device) {
        if (device && device.deviceDescriptor) {
            const deviceType = device.deviceDescriptor.bDeviceClass;
            if (deviceType == 0 || deviceType == 9) {
                const opened = (device: usb.Device): boolean => !!device.interfaces;
               
                let stringDescriptor = null
    
                try {
                    if (!opened(device)) {
                        device.open();
                    }
                        
                    const manufacturer = await this.getDescriptorStringValue(device, device.deviceDescriptor.iManufacturer);
                    const product = await this.getDescriptorStringValue(device, device.deviceDescriptor.iProduct);
                    const serialNumber =  await this.getDescriptorStringValue(device, device.deviceDescriptor.iSerialNumber);
                    if (manufacturer) {
                        stringDescriptor = manufacturer + ","; 
                    }
                    if (product) {
                        stringDescriptor = product + ","; 
                    }
                    if (serialNumber) {
                        stringDescriptor = serialNumber; 
                    }
    
                } catch (error) {
                    // Ignore any errors, device may be a system device or inaccessible
                } finally {
                    try {
                        if (opened(device)) {
                            device.close();
                        }
                    } catch(error){
                        // Ignore any errors, device may be a system device or inaccessible
                    }
                }
    
                let parentId = null;
                if (device.parent) {
                    parentId = device.parent.deviceAddress;
                    this.addDevice(device.parent);
                }
    
                const connectedDevice = new Device(device.deviceAddress, deviceType, device.deviceDescriptor.idVendor, device.deviceDescriptor.idProduct, parentId, stringDescriptor);
                this.connectedDevices.addDevice(connectedDevice);
            }
        }
    }

    public addListener(listener: IUsbConnectionListener) {
        this._listeners.add(listener);
    }

    public removeListener(listener: IUsbConnectionListener) {
        this._listeners.delete(listener);
    }

}

export { UsbConnectionMonitor, IUsbConnectionListener }