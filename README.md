# Device Tree Excercise
This is client/server solution that presents a live tree of the devices connected via USB to the server's machine. 
The tree consists of USB hubs and devices connected to them. 
Each USB hub is a branch of the tree. Each device is a leaf of a branch.
## Design
- Client and Server are connected by HTTP. 
Getting device list is available by HTTP GET method API `/devices`.
Server updates regarding connected/disconnected devices are sent by Server-Sent Events (SSE). 
- Connection managers on client and server side are implemented using Factory design pattern. 
It allows adding other connection types, such as Web Socket, easily.
- Initial Tree data is static and loaded from `device-tree-server/resources/devices.json`.
- Changes in the tree are not persistent.
- The solution supports adding/removing devices only, though adding support of hubs is very straight forward and easy. 
- I decided to manage data cache in client independently of the server, though it is possible to call `/devices` API on receiving each SSE message from the server.
My consideration was that, in case of very long device list, it will be ineffective in terms of bandwidth usage.
- I used [react-organizational-chart](https://www.npmjs.com/package/react-organizational-chart) for UI presentation of hierarchy tree of hubs and devices. I understand that it does not meet requirements of responsive UI (it looks good in Desktop Web Browser only).
However, for small number of nodes, it is very demonstrative.
## Testing
The solution was tested manually on the following environment:
- **OS:** Windows 11, MacOS Ventura
- **Node:** v16.15.1, v18.16.0
- **Browsers:** Chrome, Edge, Safari

The following is test use case:
1. Build and run server (see instructions below).
2. Build and run client (see instructions below).
3. Send POST request notifying about connected/disconnected device. The solution supports two POST method APIs: `/connected` and `/disconnected`. 
Requests' formats and examples of notifications can be found in `device-tree-client/scripts` directory. 
It is possible to send the requests running curl from command line or using Postman application.
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
