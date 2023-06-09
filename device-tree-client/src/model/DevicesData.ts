interface Device {
    _id:number;
    _type: number;
    _vendorId: number;
    _productId: number;
    _parentId: number;
    _stringDescriptor: string;

}

 export default class DevicesData {
    private _data:Device[] = [];
    
    public addDevice(device: Device) {
        if (this._data) {
            const prevDevice:any[] = this._data.filter((d: any) => {
                return d._id === device._id;
            });
            if (prevDevice.length == 0) {
                this._data.push(device);
            }
        }
    }

    public removeDevice(deviceId: number) {
        if (this._data) {
            this._data = this._data.filter((device: any) => {
                return device._id !== deviceId;
            });
        }
    }
 
    public get data() : Device[] {
        return this._data;
    }
     
    public set data(v : any[]) {
        this._data = <Array<Device>>v;
    }
    
}

export type { Device };
