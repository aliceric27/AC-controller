import { ref, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";

export default function useSocket(endpoint: string) {
  const socket = ref<Socket | null>(null);

  if (!socket.value) {
    socket.value = io(endpoint);

    onUnmounted(() => {
      socket.value?.disconnect();
    });
  }

  return {
    socket: socket.value,
  };
}
