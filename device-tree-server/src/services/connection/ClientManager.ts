class Client {
    private _id: number;
    private _data: any;
    constructor(data: any) {
        this._id = Date.now();
        this._data = data;
    }
 
    public get id():number {
        return this._id;
    }
    public get data():any {
        return this._data;
    }
}
export default class ClientManager {
    private _clients: Map<number, any>;
    constructor() {
        this._clients = new Map<number, any>();
    }
    createClient(data: any): number {
        const client = new Client(data);
        this._clients.set(client.id, client.data);
        return client.id;
    }
    deleteClient(id: number) {
        this._clients.delete(id);
    }
    
    public get clients() : Map<number, any> {
        return this._clients;
    }
    
}
