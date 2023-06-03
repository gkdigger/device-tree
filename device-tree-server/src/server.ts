import { config } from "./config";
import ConnectionManager from "./services/connection/ConnectionManager";

const connectionInstance = ConnectionManager.createConnection(config.connectionType);
connectionInstance.connect();