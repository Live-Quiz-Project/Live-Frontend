import { store } from "@/app/store";

declare global {
  type StoreRootState = ReturnType<typeof store.getState>;
  type StoreDispatch = typeof store.dispatch;

  type AuthStoreState = {
    isAuth: boolean;
    uid: string;
    username: string;
    isMod: boolean;
  };
  type InitAuthStoreState = {
    value: AuthStoreState;
  };

  type WebSocketStoreState = {
    conn: WebSocket | null;
  };
  type InitWebSocketStoreState = {
    value: WebSocketStoreState;
  };
}

export {};
