'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

export const useSocket = () => {
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on('updateSessions', (count: number) => setActiveSessions(count));

    return () => {
      socket?.off('updateSessions');
      socket?.disconnect();
    };
  }, []);

  return { activeSessions };
};
