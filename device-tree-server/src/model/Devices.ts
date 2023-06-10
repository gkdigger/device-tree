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
    private static _sharedInstance: Devices;

    private constructor() {
        this._devices = new Map<number, Device>();
    }

    public get devices() :  Map<number, Device> {
        return this._devices;
    }

    public addDevice(device: Device) {
        this._devices.set(device.id, device);
    }

    public deleteDevice(deviceId: number) {
        this._devices.delete(deviceId);
    }

    public getDevice(deviceId: number): Device {
        return this._devices.get(deviceId);
    }
    
    public reset() {
        this._devices.clear();
    }

    public getJson(): Device[] {
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

export {Device, Devices}