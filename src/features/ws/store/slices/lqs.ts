import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "@/common/services/axios";
import { AxiosError, isAxiosError } from "axios";
import WS from "@/features/ws/utils/ws";
import StoreStatus from "@/common/utils/async-store-statuses";

const initState = {
  value: {
    id: "",
    code: "",
    quizId: "",
    status: StoreStatus.IDLE,
    error: null,
  } as LqsStoreState,
} as InitLqsStoreState;

export const lqs = createSlice({
  name: "lqs",
  initialState: initState,
  reducers: {
    setLqs: (state, action: PayloadAction<LqsStorePayload>) => {
      state.value.id = action.payload.id;
      state.value.code = action.payload.code;
      state.value.quizId = action.payload.quizId;
    },
    resetLqs: (state) => {
      state.value = initState.value;
    },
    connect: () => {},
    disconnect: (state) => {
      state.value = initState.value;
    },
    trigger: (_, action: PayloadAction<WSAction>) => {
      console.log(`${action.payload.type} triggered`);
    },
    start: (state, action: PayloadAction<WS>) => {
      console.log(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLqs.pending, (state) => {
        state.value.status = StoreStatus.PENDING;
      })
      .addCase(createLqs.fulfilled, (state, action) => {
        state.value.status = StoreStatus.SUCCESS;
        state.value.id = action.payload.id;
        state.value.code = action.payload.code;
        state.value.quizId = action.payload.quizId;
      })
      .addCase(createLqs.rejected, (state, action) => {
        state.value.status = StoreStatus.FAILURE;
        if (isAxiosError(action.payload)) {
          state.value.error = action.payload as AxiosError;
        } else {
          state.value.error = action.payload as Error;
        }
      })
      .addCase(joinLqs.pending, (state) => {
        state.value.status = StoreStatus.PENDING;
      })
      .addCase(joinLqs.fulfilled, (state, action) => {
        state.value.status = StoreStatus.SUCCESS;
        state.value.id = action.payload.id;
        state.value.code = action.payload.code;
        state.value.quizId = action.payload.quizId;
      })
      .addCase(joinLqs.rejected, (state, action) => {
        state.value.status = StoreStatus.FAILURE;
        if (isAxiosError(action.payload)) {
          state.value.error = action.payload as AxiosError;
        } else {
          state.value.error = action.payload as Error;
        }
      });
  },
});

export const createLqs = createAsyncThunk(
  "lqs/createLqs",
  async (quizId: string, { getState }) => {
    const { auth } = getState() as StoreRootState;
    const {
      user: { id },
    } = auth.value;
    try {
      const { data } = await http.post(`/lqses`, {
        quizId: quizId,
        hostId: id,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const joinLqs = createAsyncThunk("lqs/joinLqs", async (code: string) => {
  try {
    const { data } = await http.get(`/lqses/check/${code}`);
    return data;
  } catch (error) {
    return error;
  }
});

export const endLqs = createAsyncThunk(
  "lqs/endLqs",
  async (_, { getState }) => {
    const { lqs } = getState() as StoreRootState;
    try {
      const { data } = await http.delete(`/lqses/${lqs.value.id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const connected = (state: StoreRootState) =>
  !!state.lqs.value.code && !!state.lqs.value.id && !!state.lqs.value.quizId;

export const { connect, disconnect, trigger, setLqs, start, resetLqs } =
  lqs.actions;
export default lqs.reducer;
