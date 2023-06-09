import express, { Request, Response } from 'express';
import IConnection from "../IConnection";
import ClientManager from '../ClientManager';
import {Device, Devices, IDevicesConnectionListener} from '../../../model/Devices';
import { config } from '../../../config';

const clientManager = new ClientManager();
const devices = Devices.getSharedInstance();


export default class HTTPConnection implements IConnection {
    private _app: express.Express = express();
    private static DeviceConnectionListener = class implements IDevicesConnectionListener{
      deviceAdded(device: Device): void {
        const newMessage = {
          connected: device
        }
        HTTPConnection.sendEventsToAll(newMessage);          
      }

      deviceRemoved(deviceId: number): void {
        const newMessage = {
          disconnected: deviceId
        }
         
        HTTPConnection.sendEventsToAll(newMessage);
        }
  }

  private _connectionListener = new HTTPConnection.DeviceConnectionListener();
  
    constructor() {
      this._app.use(express.json());
      this._app.use(express.urlencoded({extended: false}));
      devices.addListener(this._connectionListener);
    }

    connect(): void {
      this._app.listen(config.port, () => {
        return console.log(`Express is listening at http://localhost:${config.port}`);
      });        
      this._app.get('/devices', HTTPConnection.devicesHandler);        
      this._app.get('/events', HTTPConnection.eventHandler);
    }

    private static devicesHandler(request: Request, response: Response) {     
      response.setHeader('Access-Control-Allow-Origin', '*').json(devices.getJson());
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