export default class DevicesData {
    private _data:any[] = [];
    
    public addDevice(device: any) {
        if (this._data) {
            const prevDevice:any[] = this._data.filter((d: any) => {
                return d._id === device._id;
            });
            if (prevDevice.length == 0) {
                this._data.push(device);
            }
        }
    }

    public removeDevice(deviceId: number): any {
        if (this._data) {
            this._data = this._data.filter((device: any) => {
                return device._id !== deviceId;
            });
        }
    }
 
    public get data() : any[] {
        return this._data;
    }
     
    public set data(v : any[]) {
        this._data = v;
    }
    
}