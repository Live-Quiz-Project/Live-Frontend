declare global {
  type User = {
    id: string;
    emoji: string;
    color: string;
    name: string;
    isHost: boolean;
  };
}

export {};
