interface IDevicesConnectionListener {
    deviceAdded(device: Device): void;
    deviceRemoved(deviceId: number) : void;
}

class Device {
    private _id:number;
    private _type: number;
    private _vendorId: number;
    private _productId: number;
    private _parentId: number;
    private _stringDescriptor: string;

    constructor( id:number, type: number, vendorId: number, productId: number,  parentId?: number, stringDescriptor?: string) {
        this._id = id;
        this._type = type;
        this._vendorId = vendorId;
        this._productId = productId;
        this._parentId = parentId;
        this._stringDescriptor = stringDescriptor;
    }

    
    public get id() : number {
        return this._id;
    }
    
}

class Devices {
    private _devices: Map<number, Device>;
    private _listeners: Set<IDevicesConnectionListener>;
    private static _sharedInstance: Devices;

    private constructor() {
        this._devices = new Map<number, Device>();
        this._listeners = new Set<IDevicesConnectionListener>();
    }

    public get devices() : any {
        return this._devices;
    }

    public addDevice(device: Device) {
        this._devices.set(device.id, device);
        this._listeners.forEach((listener) => {
            listener.deviceAdded(device);
        });
    }

    public deleteDevice(deviceId: number) {
        this._devices.delete(deviceId);
        this._listeners.forEach((listener) => {
            listener.deviceRemoved(deviceId);
        });
    }

    public addListener(listener: IDevicesConnectionListener) {
        this._listeners.add(listener);
    }

    public removeListener(listener: IDevicesConnectionListener) {
        this._listeners.delete(listener);
    }

    public getJson(): any[] {
        const deviceArray = Array.from(this._devices.values());
        return deviceArray;
    }

    static getSharedInstance(): Devices {
        if (!Devices._sharedInstance) {
            Devices._sharedInstance = new Devices();
        }
        return Devices._sharedInstance;
    }
}

export {Device, Devices, IDevicesConnectionListener}