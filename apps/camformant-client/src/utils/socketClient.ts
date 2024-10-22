import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL, {
  withCredentials: true
});

export default socket;
