import { useEffect } from "react";
import { useTypedSelector } from "@/common/hooks/useTypedSelector";
import { connect, disconnect } from "@/features/ws/store/slices/lqs";
import { useDispatch } from "react-redux";
import wss from "@/features/ws/utils/statuses";
import OnStarting from "@/features/quiz/participant/components/OnStarting";
import OnQuestioning from "@/features/quiz/participant/components/OnQuestioning";
import OnAnswering from "@/features/quiz/participant/components/OnAnswering";
import OnAnswered from "@/features/quiz/participant/components/OnAnswered";
import OnRevealingAnswer from "@/features/quiz/participant/components/OnRevealingAnswer";
import { resetMod } from "@/features/ws/store/slices/mod";
import { useNavigate } from "react-router-dom";

export default function ParticipantLiveQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const mod = useTypedSelector((state) => state.mod);

  useEffect(() => {
    dispatch(connect());
  }, []);

  useEffect(() => {
    console.log(mod.value);
  }, [mod.value]);

  if (mod.value.lqsStatus === wss.STARTING) {
    return <OnStarting timeLeft={mod.value.timeLeft} />;
  }

  if (mod.value.lqsStatus === wss.QUESTIONING) {
    if (!mod.value.question || mod.value.timeLeft < 0) return null;
    return (
      <OnQuestioning
        question={mod.value.question}
        timeLeft={mod.value.timeLeft}
      />
    );
  }

  if (mod.value.lqsStatus === wss.ANSWERING) {
    if (
      !mod.value.question ||
      !mod.value.question.options ||
      mod.value.timeLeft < 0
    )
      return null;
    return (
      <OnAnswering
        question={mod.value.question}
        options={mod.value.question.options}
        timeLeft={mod.value.timeLeft}
      />
    );
  }

  if (mod.value.lqsStatus === wss.ANSWERED) {
    return <OnAnswered />;
  }

  if (mod.value.lqsStatus === wss.REVEALING_ANSWER) {
    if (!mod.value.question || !mod.value.question.answer) return null;
    return (
      <OnRevealingAnswer
        question={mod.value.question}
        answer={mod.value.question.answer}
      />
    );
  }

  if (mod.value.lqsStatus === wss.ENDING) {
    dispatch(resetMod());
    dispatch(disconnect());
    navigate("/join", { replace: true });
  }
}
