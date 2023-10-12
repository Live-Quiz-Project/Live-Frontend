import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  value: {
    isAuth: false,
    uid: "",
    username: "",
    isMod: false,
  } as AuthStoreState,
} as InitAuthStoreState;

export const auth = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: () => {
      return initState;
    },
    logIn: (_, action: PayloadAction<AuthStoreState>) => {
      value: {
        isAuth: true;
        uid: action.payload.uid;
        username: action.payload.username;
        isMod: action.payload.isMod;
      }
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
