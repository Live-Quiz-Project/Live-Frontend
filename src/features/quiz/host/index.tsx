import { useEffect } from "react";
import { useTypedSelector } from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { trigger } from "../../ws/store/slices/lqs";
import wsat from "@/features/ws/utils/action-types";

export default function HostLiveQuiz() {
  const dispatch = useDispatch<StoreDispatch>();
  const lqs = useTypedSelector((state) => state.lqs);
  const mod = useTypedSelector((state) => state.mod);

  useEffect(() => {
    console.log(mod.value);
  }, [mod.value]);

  function handleOnNext() {
    dispatch(
      trigger({
        type: wsat.NEXT_QUESTION,
        payload: {
          id: lqs.value.id,
        },
      })
    );
  }

  return (
    <div>
      {mod.value.curQ < mod.value.qCount && (
        <button
          onClick={handleOnNext}
          className="p-2 border border-white rounded-md"
        >
          Next
        </button>
      )}
    </div>
  );
}
