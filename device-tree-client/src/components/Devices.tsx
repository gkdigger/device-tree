import React, { useEffect, useState } from 'react';
import ConnectionClientManager from "../api/connectivity/ConnectionClientManager";
import { config } from "../config";
import { getDevices } from "../api/devices";
import DeviceTreeView from './DeviceTreeView';
import DevicesData from '../model/DevicesData';

const devicesData = new DevicesData();

function Devices() {
    const [ listening, setListening ] = useState(false);
    const [ devices, setDevices ] = useState({});
    const [ focusedTab, setFocusedTab ] = useState(0);
    useEffect( () => {
        if (!listening) {
            getDevices((data: any, error: any) => {
                if (data) {
                    devicesData.data = data;
                    setDevices(data);
                } else {
                    setDevices({});
                }

                if (!error) {
                    const connection = ConnectionClientManager.createConnection(config.connectionType);
                    connection.connect((data: any) => {
                        if (data && data.connected) {
                            devicesData.addDevice(data.connected);
                            setDevices({...devicesData.data});
                        } else if (data && data.disconnected) {
                            if (data.disconnected) {
                                const deviceId: number = data.disconnected.deviceId;
                                devicesData.removeDevice(deviceId);
                                setDevices({...devicesData.data});
                            }
                        }
                    });    
                }
            });
        }
    }, []);

    return (
        <div className="container-fluid">
            <p className="fs-1">Device Tree</p>
            <ul className="nav nav-pills">
                <li className="nav-item" onClick={() => {setFocusedTab(0)}}>
                    <a className={(focusedTab === 0) ? "nav-link active": "nav-link"} aria-current="page" href="#">Sort by Hubs</a>
                </li>
                <li className="nav-item" onClick={() => {setFocusedTab(1)}}>
                    <a className={(focusedTab === 1) ? "nav-link active": "nav-link"} href="#">Sort by Device types</a>
                </li>
            </ul>
        <DeviceTreeView devices={devices} sortType={focusedTab} />
        </div>
    );
}

export default Devices;