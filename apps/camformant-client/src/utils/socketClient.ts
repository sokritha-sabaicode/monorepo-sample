// src/socketClient.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3002");

export default socket;
