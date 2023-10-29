import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import wss from "@/features/ws/utils/statuses";

const initState = {
  value: {
    qCount: 0,
    curQ: 0,
    timeLeft: -1,
    lqsStatus: wss.IDLE,
    question: null,
  } as ModStoreState,
} as InitModStoreState;

export const mod = createSlice({
  name: "mod",
  initialState: initState,
  reducers: {
    setMod: (state, action: PayloadAction<ModStorePayload>) => {
      state.value.curQ = action.payload.curQ;
      state.value.lqsStatus = action.payload.status;
    },
    setQuestionCount: (state, action: PayloadAction<number>) => {
      state.value.qCount = action.payload;
    },
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.value.timeLeft = action.payload;
    },
    setQuestion: (state, action: PayloadAction<Question>) => {
      state.value.question = action.payload;
    },
    setOptions: (state, action: PayloadAction<Option[]>) => {
      if (!state.value.question) {
        state.value.question = {} as Question;
      }
      state.value.question.options = action.payload;
    },
    setAnswer: (state, action: PayloadAction<Answer>) => {
      if (!state.value.question) {
        state.value.question = {} as Question;
      }
      state.value.question.answer = action.payload;
    },
    resetMod: (state) => {
      state.value.curQ = initState.value.curQ;
      state.value.timeLeft = initState.value.timeLeft;
      state.value.lqsStatus = initState.value.lqsStatus;
    },
    resetQuestion: (state) => {
      state.value.question = initState.value.question;
    },
  },
});

export const {
  setMod,
  setQuestionCount,
  setTimeLeft,
  setQuestion,
  setOptions,
  setAnswer,
  resetMod,
} = mod.actions;
export default mod.reducer;
