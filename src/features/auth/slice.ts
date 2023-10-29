import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  value: {
    isAuth: false,
    user: {
      id: "",
      name: "",
      emoji: "SMILEY",
      color: "",
      isHost: false,
    },
  } as AuthStoreState,
} as InitAuthStoreState;

export const auth = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: (state) => {
      state.value = initState.value;
    },
    logIn: (state, action: PayloadAction<User>) => {
      state.value = {
        isAuth: true,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          emoji: "SMILEY",
          color: "#AAA",
          isHost: action.payload.isHost,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
