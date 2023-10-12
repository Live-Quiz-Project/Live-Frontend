import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  value: {
    conn: null,
  } as WebSocketStoreState,
} as InitWebSocketStoreState;

export const ws = createSlice({
  name: "ws",
  initialState: initState,
  reducers: {
    setConn: (_, action: PayloadAction<WebSocketStoreState>) => {
      value: {
        conn: action.payload.conn;
      }
    },
  },
});

export const { setConn } = ws.actions;
export default ws.reducer;
