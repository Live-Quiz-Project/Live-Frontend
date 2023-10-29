import WSStatus from "@/features/ws/utils/statuses";
import AsyncStoreStatus from "@/common/utils/async-store-statuses";
import { participants } from "./../../features/lobby/slice";
import { store } from "@/app/store";
import { AxiosError } from "axios";

declare global {
  type StoreRootState = ReturnType<typeof store.getState>;
  type StoreDispatch = typeof store.dispatch;

  type AuthStoreState = {
    isAuth: boolean;
    user: User;
  };
  type InitAuthStoreState = {
    value: AuthStoreState;
  };

  type LqsStoreState = {
    id: string;
    code: string;
    quizId: string;
    status: AsyncStoreStatus;
    error: AxiosError | Error | null;
  };
  type LqsStorePayload = {
    id: string;
    code: string;
    quizId: string;
  };
  type InitLqsStoreState = {
    value: LqsStoreState;
  };

  type ModStoreState = {
    qCount: number;
    curQ: number;
    timeLeft: number;
    lqsStatus: WSStatus;
    question: Question | null;
  };
  type ModStorePayload = {
    curQ: number;
    status: WSStatus;
  };
  type InitModStoreState = {
    value: ModStoreState;
  };

  type LobbyStoreState = {
    participants: User[];
    status: AsyncStoreStatus;
    error: AxiosError | Error | null;
  };
  type InitLobbyStoreState = {
    value: LobbyStoreState;
  };
}

export {};
