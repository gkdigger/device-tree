import React from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import './DeviceTreeView.css'

function DeviceTreeView(params: any) {
    const sortType = params.sortType;
    const devices = params.devices;
    
    const DevicesByHubs = () => (
        <Tree label={<div><b>Root</b></div>}>
            {
                devices.hubs.map((hub: any) => {
                    return (
                        <TreeNode key={hub.id} label={<div className="styled-node">
                                            <div><b>Type:</b> Hub</div>
                                            <div><b>Vendor:</b> {hub.vendorId}</div>
                                            <div><b>Product:</b> {hub.productId}</div>
                                            <div><b>Description:</b> {hub.description}</div>
                                            </div>}>
                        {
                            devices.devices.filter((device: any) => {
                                return device.hubId === hub.id;
                            }).map((device: any) => {
                                return (
                                    <TreeNode key={device.id} label={<div className="styled-node">
                                            <div><b>Type:</b> Device</div>
                                            <div><b>Vendor:</b> {device.vendorId}</div>
                                            <div><b>Product:</b> {device.productId}</div>
                                            <div><b>Description:</b> {device.description}</div>
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

    const DevicesByType = () => (
        <Tree label={<div><b>Root</b></div>}>
            {
                devices.types.map((type: any, index:number) => {
                    return (
                        <TreeNode key={index} label={<div className="styled-node">{type}</div>}>
                        {
                            devices.devices.filter((device: any) => {
                                return device.deviceType === type;
                            }).map((device: any) => {
                                return (
                                    <TreeNode key={device.id} label={<div className="styled-node">
                                            <div><b>Type:</b> Device</div>
                                            <div><b>Vendor:</b> {device.vendorId}</div>
                                            <div><b>Product:</b> {device.productId}</div>
                                            <div><b>Description:</b> {device.description}</div>
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
                {(sortType == 0 && devices.hubs) ? <DevicesByHubs /> : (sortType == 1 && devices.types)? <DevicesByType />: <div>No data</div>}
        </div>
    );
}

export default DeviceTreeView;