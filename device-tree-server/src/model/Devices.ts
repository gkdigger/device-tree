import * as fs from 'fs';

export default class Devices {
    private _data;
    constructor() {
        this._data = this.getAll();
    }
    private getAll() : any {
        let data: any;
        try {
            data = fs.readFileSync('resources/devices.json');
            if (data && Object.keys(data).length > 0) {
                data = JSON.parse(data);
            }
        } catch (error) {
            console.log(error);            
        }
        return data;
    }

    public get data() : any {
        return this._data;
    }

    public addDevice(device: any) {
        if (device && Object.keys(device).length > 0) {
            this._data.devices.push(device);
        }
    }

    public deleteDevice(deviceId: number): any {
        const deletedDevice = this._data.devices.filter((device:any) => {
            return device.id === deviceId;
        });

        this._data.devices = this._data.devices.filter((device:any) => {
            return device.id !== deviceId;
        });

        return deletedDevice;
    }
}