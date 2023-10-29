import { Dispatch, Middleware, PayloadAction } from "@reduxjs/toolkit";
import WS from "@/features/ws/utils/ws";
import wsat from "@/features/ws/utils/action-types";
import { connected, resetLqs } from "@/features/ws/store/slices/lqs";
import { fetchParticipant } from "@/features/lobby/store/slice";
import {
  setAnswer,
  setMod,
  setOptions,
  setQuestion,
  setQuestionCount,
  setTimeLeft,
} from "@/features/ws/store/slices/mod";
import wss from "@/features/ws/utils/statuses";

const wsMiddleware =
  (ws: WS): Middleware =>
  (storeAPI: { getState: any; dispatch: Dispatch<any> }) =>
  (next) =>
  (action: PayloadAction<WSAction | undefined>) => {
    const { getState, dispatch } = storeAPI;
    const { type, payload } = action;
    const { auth, lqs }: StoreRootState = getState();
    const {
      user: { id, name, isHost },
    } = auth.value;
    const { code } = lqs.value;

    switch (type) {
      case "lqs/connect":
        if (!id && !name && !code) {
          console.error("Not enought information provided to connect");
          break;
        }
        ws.connect(
          `${
            import.meta.env.VITE_WEBSOCKET_URL
          }/lqses/join/${code}?uid=${id}&uname=${name}&is-host=${isHost}`
        );

        ws.on("open", () => {
          console.log("Connection established");
          ws.send({ type: wsat.JOINED_LQS });
        });

        ws.on("message", (e) => {
          try {
            const m: WSMessage = JSON.parse((e as MessageEvent).data);
            const { type: t, payload: p } = m.content;
            // console.log(t, p);

            switch (t) {
              case wsat.JOINED_LQS:
                dispatch(fetchParticipant());
                break;
              case wsat.LEFT_LQS:
                dispatch(fetchParticipant());
                break;
              case wsat.START_LQS:
                dispatch(
                  setMod({
                    curQ: 0,
                    status: wss.STARTING,
                  })
                );
                break;
              case wsat.END_LQS:
                dispatch(
                  setMod({
                    curQ: 0,
                    status: wss.ENDING,
                  })
                );
                break;
              case wsat.COUNTDOWN:
                dispatch(setTimeLeft(p.timeLeft));
                break;
              case wsat.DISTRIBUTE_QUESTION:
                console.log(t, p);
                dispatch(setQuestionCount(p.mod.qCount));
                dispatch(
                  setMod({
                    curQ: p.mod.curQ,
                    status: p.mod.status,
                  })
                );
                dispatch(setQuestion(p.question));
                break;
              case wsat.DISTRIBUTE_OPTIONS:
                console.log(t, p);
                dispatch(
                  setMod({
                    curQ: p.mod.curQ,
                    status: p.mod.status,
                  })
                );
                dispatch(setOptions(p.options));
                break;
              case wsat.REVEAL_ANSWER:
                console.log(t, p);
                dispatch(
                  setMod({
                    curQ: p.mod.curQ,
                    status: p.mod.status,
                  })
                );
                dispatch(setAnswer(p.answer));
                break;
              default:
                break;
            }
          } catch (error) {
            console.error(error);
          }
        });

        ws.on("close", () => {
          dispatch(
            setMod({
              curQ: 0,
              status: wss.ENDING,
            })
          );
          console.log("Connection closed");
        });

        break;

      case "lqs/trigger":
        if (!connected) {
          console.log("Not connected");

          ws.connect(
            `${
              import.meta.env.VITE_WEBSOCKET_URL
            }/lqses/join/${code}?uid=${id}&uname=${name}&is-host=${isHost}`
          );
          ws.on("open", () => {
            ws.send({
              type: (payload as WSAction).type,
              payload: (payload as WSAction).payload,
            });
          });
          break;
        }

        ws.send({
          type: (payload as WSAction).type,
          payload: (payload as WSAction).payload,
        });
        break;

      case "lqs/endLqs":
        dispatch(
          setMod({
            curQ: 0,
            status: wss.ENDING,
          })
        );
        dispatch(resetLqs());
        ws.send({ type: wsat.END_LQS });
        break;

      case "lqs/disconnect":
        ws.send({ type: wsat.LEFT_LQS });
        ws.disconnect();
        break;

      default:
        break;
    }

    return next(action);
  };

export default wsMiddleware;
