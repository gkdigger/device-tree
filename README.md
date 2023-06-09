# Device Tree Excercise
This is client/server solution that presents a live tree of the devices connected via USB to the server's machine. 
The tree consists of USB hubs and devices connected to them. 
Each USB hub is a branch of the tree. Each device is a leaf of a branch.
## Design
- Client and Server are connected by HTTP. Getting device list is available by HTTP GET method API `/devices`.
Server updates regarding connected/disconnected devices are sent by Server-Sent Events (SSE).
- The solution supports two USB class codes: `00h`(Device) and `09h`(Hub).
- Connection managers on client and server side are implemented using Factory design pattern. 
It allows adding other connection types, such as Web Socket, easily.
- I used [node-usb](https://github.com/node-usb/node-usb) library for communicating with USB devices.
- I decided to manage data cache in client independently of the server (**thick client** approach), though it is possible to call `/devices` API on receiving each SSE message from the server (**thin client** approach).
My consideration was that it will be ineffective in terms of bandwidth usage in case of very long device list.
- Server keeps flat list of hubs and devices. Hierarchy can be recognized using device `_id` and `_parentId` properties. As device id I used USB deviceAddress property.
- I used [react-organizational-chart](https://www.npmjs.com/package/react-organizational-chart) for UI presentation of hierarchy tree of hubs and devices. I understand that it does not meet requirements of responsive UI (it looks good in Desktop Web Browser only).
However, for small number of nodes, it is very demonstrative.
## Testing
The solution was tested manually on the following environment:
- **OS:** Windows 11
- **Node:** v16.15.1, v18.16.0
- **Browsers:** Chrome, Edge, Safari

### Test use case:
1. Build and run server (see instructions below).
2. Build and run client (see instructions below).
3. Attach/detach USB devices to the server machine.
### Observed issues:
- I observed an issue with `node-usb` on using external USB hub. The library remembers location in the hierarchy of a device attached to external hub even after detaching and re-attaching the same device to another hub.
- WebUSB attach/detach listener didn't work on my machine.
## Build and run
### Server
```
cd device-tree-server
npm install
npm run start
```
Server url: `http://localhost:3001`

### Client

__For node v16.*__
```
cd device-tree-client
npm install
npm start
```

__For node v17 or more__
```
cd device-tree-client
npm install
npm run start_v17
```

Client url: `http://localhost:3000`
