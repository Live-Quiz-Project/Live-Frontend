declare global {
  type WSMessage = {
    content: WSAction;
    lqsId: string;
    uid: string;
    isHost: boolean;
  };

  type WSAction = {
    type: string;
    payload?: any;
  };
}

export {};
