export default class DevicesData {
    private _data: any = {};
    
    public addDevice(device: any) {
        if (this._data.devices) {
            const prevDevice:[] = this._data.devices.filter((d: any) => {
                return d.id === device.id;
            });
            if (prevDevice.length == 0) {
                this._data.devices.push(device);
            }
        }
    }

    public removeDevice(deviceId: number): any {
        if (this._data.devices) {
            this._data.devices = this._data.devices.filter((device: any) => {
                return device.id !== deviceId;
            });
        }
    }
 
    public get data() : any {
        return this._data;
    }
     
    public set data(v : any) {
        this._data = v;
    }
    
}