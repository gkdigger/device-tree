import React from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import './DeviceTreeView.css'
import { Device } from "../model/DevicesData";

enum DeviceTypes {
    Device = 0,
    Hub = 9
}

function DeviceTreeView(params: any) {
    const sortType = params.sortType;
    const devices:Device[] = params.devices;
    const deviceTypes = [DeviceTypes.Device, DeviceTypes.Hub];
    
    const iterateDevicesHierarchy = (devices:Device[], parentId:number|null): any  => {
        return(<>
        {
            devices.filter((device: Device) => {
                return device._parentId == parentId;
            }).map((device:Device) => {
                if (device._type == 9) {
                    return (
                        <TreeNode key={device._id} label={<div className="styled-node">
                        <div><b>Type:</b>  {DeviceTypes[device._type]}</div>
                        <div><b>Vendor:</b> {device._vendorId}</div>
                        <div><b>Product:</b> {device._productId}</div>
                        <div><b>Description:</b> {device._stringDescriptor}</div>
                    </div>}>
                        {iterateDevicesHierarchy(devices, device._id)}
                    </TreeNode>    
                    );
            } else {
                    return (
                        <TreeNode key={device._id} label={<div className="styled-node">
                        <div><b>Type:</b> {DeviceTypes[device._type]}</div>
                        <div><b>Vendor:</b> {device._vendorId}</div>
                        <div><b>Product:</b> {device._productId}</div>
                        <div><b>Description:</b> {device._stringDescriptor}</div>
                    </div>}></TreeNode>
                    );
    
                }
            })
    
        }</>
        )
        
    };
    const DevicesByHubs = () => (
        <Tree label={<div><b>Root</b></div>}>
            {
                iterateDevicesHierarchy(devices, null)
            }
        </Tree>
    );

    const DevicesByType = () => (
        <Tree label={<div><b>Root</b></div>}>
            {
                deviceTypes.map((type: DeviceTypes, index:number) => {
                    return (
                        <TreeNode key={index} label={<div className="styled-node">{DeviceTypes[type]}s</div>}>
                        {
                            devices.filter((device: Device) => {
                                return device._type == type;
                            }).map((device: Device) => {
                                return (
                                    <TreeNode key={device._id} label={<div className="styled-node">
                                            <div><b>Type:</b> {DeviceTypes[device._type]}</div>
                                            <div><b>Vendor:</b> {device._vendorId}</div>
                                            <div><b>Product:</b> {device._productId}</div>
                                            <div><b>Description:</b> {device._stringDescriptor}</div>
                                        </div>}></TreeNode>
                                );
                            })
                        }

                        </TreeNode> 
                    );
                })
            }
        </Tree>
    );

    return (
        <div>
                {(sortType == 0 && devices) ? <DevicesByHubs /> : (sortType == 1 && devices)? <DevicesByType />: <div>No data</div>}
        </div>
    );
}

export default DeviceTreeView;