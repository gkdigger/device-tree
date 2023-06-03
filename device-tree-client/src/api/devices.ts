import { config } from "../config";
import axios from "axios";

export function getDevices(callback: (data:any, error: any) => void) {
    axios.get(`${config.protocol}://${config.host}:${config.port}/devices`).then((res) => callback(res.data, null)).catch((error) => callback(null, error));
}