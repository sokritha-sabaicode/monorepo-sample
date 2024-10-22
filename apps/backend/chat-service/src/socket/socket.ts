import { Server, Socket } from 'socket.io';
import { MessageService } from '../services/message.service';

const onlineUsers = new Map<string, Set<string>>();

const setupSocketIO = (io: Server) => {
  const messageService = new MessageService();

  io.on('connection', (socket: Socket) => {

    // Check if the cookies exist in the socket handshake headers
    const cookies = socket.handshake.headers['cookie'];

    if (cookies) {
      const userIdCookie = cookies.split('; ').find((cookie) => cookie.startsWith('user_id='));
      if (userIdCookie) {
        const userId = userIdCookie.split('=')[1];
        socket.data.userId = userId;
      } else {
        console.error('user_id cookie not found.');
      }
    } else {
      console.error('No cookies found in the handshake headers');
    }

    const userId = socket.data.userId;

    // Add user to online list
    if (socket.data.userId) {
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId)!.add(socket.id);

      // Emit to all clients that the user is online
      io.emit('userOnline', userId);
    }

    // Join room
    socket.on('joinRoom', ({ conversationId }) => {
      socket.join(conversationId);
    })


    // Handle incoming messages
    socket.on('sendMessage', async (data) => {
      console.log('data::: ', data)
      try {
        const savedMessage = await messageService.saveMessage({
          text: data.text,
          senderId: data.senderId,
          recipientId: data.recipientId,
          conversationId: data.conversationId
        });

        io.to(data.conversationId).emit('receiveMessage', savedMessage)
      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('error', 'Failed to process message');
      }
    });

    socket.on('disconnect', () => {
      if (userId && onlineUsers.has(userId)) {
        onlineUsers.get(userId)!.delete(socket.id);
        if (onlineUsers.get(userId)!.size === 0) {
          onlineUsers.delete(userId);
          // Emit to all clients that the user is offline
          io.emit('userOffline', userId);
        }
      }
    });
  });
};

export default setupSocketIO;
