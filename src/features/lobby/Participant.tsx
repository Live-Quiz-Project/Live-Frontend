import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { connect, disconnect } from "@/features/ws/store/slices/lqs";
import { resetMod } from "@/features/ws/store/slices/mod";
import { fetchParticipant } from "@/features/lobby/store/slice";
import wss from "@/features/ws/utils/statuses";
import logo from "@/common/assets/logo.png";
import UserCard from "@/common/components/cards/UserCard";
import FilledButton from "@/common/components/buttons/FilledButton";
import QR from "react-qr-code";

export default function ParticipantLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const auth = useTypedSelector((state) => state.auth);
  const lqs = useTypedSelector((state) => state.lqs);
  const mod = useTypedSelector((state) => state.mod);

  useEffect(() => {
    dispatch(connect());
    (async () => {
      await dispatch(fetchParticipant());
    })();
  }, []);

  useEffect(() => {
    if (mod.value.lqsStatus === wss.STARTING) {
      navigate(`/participant/lqs/${lqs.value.code}`);
    } else if (mod.value.lqsStatus === wss.ENDING) {
      dispatch(resetMod());
      handleOnLeave();
    }
  }, [mod.value.lqsStatus]);

  function handleOnLeave() {
    dispatch(disconnect());
    navigate("/join", { replace: true });
  }

  return (
    <div className="h-screen py-16 bg-sky-blue">
      <div className="container relative flex items-center justify-center h-full mx-auto text-peach text-header-1">
        <div className="absolute top-0 left-0 space-y-4">
          <img src={logo} alt="Logo" className="w-52 h-fit" />
          <p className="font-sans-serif ">&#35;{lqs.value.code}</p>
        </div>
        <QR
          className="absolute top-0 right-0 w-32 p-2 rounded-md bg-peach h-fit"
          value={`${import.meta.env.VITE_BASE_URL}/join/${lqs.value.code}`}
          fgColor="#22668D"
          bgColor="transparent"
        />
        <div className="relative text-center">
          <p className="absolute font-serif -translate-x-1/2 bottom-32 w-max left-1/2">
            Look at the screen!
            <br />
            You've joined as
          </p>
          <UserCard user={auth.value.user} size="l" />
          <p className="absolute font-serif -translate-x-1/2 top-32 w-max left-1/2">
            Now, wait for others to join...
          </p>
        </div>
        <FilledButton
          className="absolute bottom-0 -translate-x-1/2 text-header-2 left-1/2 text-ocean-blue bg-peach"
          onClick={handleOnLeave}
        >
          Leave
        </FilledButton>
      </div>
    </div>
  );
}
