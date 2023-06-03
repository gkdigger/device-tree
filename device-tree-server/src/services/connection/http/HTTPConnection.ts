import express, { Request, Response } from 'express';
import IConnection from "../IConnection";
import ClientManager from '../ClientManager';
import Devices from '../../../model/Devices';
import { config } from '../../../config';

const clientManager = new ClientManager();
const devices = new Devices();

export default class HTTPConnection implements IConnection {
    private _app: express.Express = express();
  
    constructor() {
      this._app.use(express.json());
      this._app.use(express.urlencoded({extended: false}));
    }

    connect(): void {
      this._app.listen(config.port, () => {
        return console.log(`Express is listening at http://localhost:${config.port}`);
      });        
      this._app.get('/devices', HTTPConnection.devicesHandler);        
      this._app.get('/events', HTTPConnection.eventHandler);
      this._app.post('/connected', HTTPConnection.connectedDeviceHandler);    
      this._app.post('/disconnected', HTTPConnection.disconnectedDeviceHandler);      
    }

    private static devicesHandler(request: Request, response: Response) {     
      response.setHeader('Access-Control-Allow-Origin', '*').json(devices.data);
    }

    private static connectedDeviceHandler(request: Request, response: Response) {
      const newMessage = {
        connected: request.body
      }
      response.setHeader('Access-Control-Allow-Origin', '*').json(request.body);
      devices.addDevice(request.body);
      HTTPConnection.sendEventsToAll(newMessage);
    }

    private static disconnectedDeviceHandler(request: Request, response: Response) {
      const newMessage = {
        disconnected: request.body
      }

      let disconnectedDevice:any;
      if (request.body) {
        const deviceId = request.body.deviceId;
        disconnectedDevice = devices.deleteDevice(deviceId);
      }
      response.setHeader('Access-Control-Allow-Origin', '*').json(disconnectedDevice);
      
      HTTPConnection.sendEventsToAll(newMessage);
    }

    private static sendEventsToAll(newMessage) {
      clientManager.clients.forEach((response: Response) => {
        response.write(`data: ${JSON.stringify(newMessage)}\n\n`)
      });
    }

    private static eventHandler(request: Request, response: Response) {
      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      };
      response.writeHead(200, headers);
     
      const data = `data: \n\n`; 

      response.write(data);

      const clientId = clientManager.createClient(response);
      console.log("New client has been created:", clientId);

      request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clientManager.deleteClient(clientId);
      });
    }
}