interface Window {
  electron: {
    sendMessage: (channel: string, data?: unknown) => void;
    receiveMessage: (channel: string, func: (data: unknown) => void) => void;
  };
}
