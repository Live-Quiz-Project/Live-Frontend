import { http } from "@/common/services/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import StoreStatus from "@/common/utils/async-store-statuses";

const initState = {
  value: {
    participants: [],
    status: StoreStatus.IDLE,
    error: null,
  } as LobbyStoreState,
} as InitLobbyStoreState;

export const lobby = createSlice({
  name: "lobby",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipant.pending, (state) => {
        state.value.status = StoreStatus.PENDING;
      })
      .addCase(fetchParticipant.fulfilled, (state, action) => {
        state.value.status = StoreStatus.SUCCESS;
        state.value.participants = action.payload;
      })
      .addCase(fetchParticipant.rejected, (state, action) => {
        state.value.status = StoreStatus.FAILURE;
        if (isAxiosError(action.payload)) {
          state.value.error = action.payload as AxiosError;
        } else {
          state.value.error = action.payload as Error;
        }
      });
  },
});

export const fetchParticipant = createAsyncThunk(
  "lobby/fetchParticipants",
  async (_, { getState }) => {
    const { lqs } = getState() as StoreRootState;
    const { id } = lqs.value;
    try {
      const { data } = await http.get(`/lqses/${id}/participants`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export default lobby.reducer;
