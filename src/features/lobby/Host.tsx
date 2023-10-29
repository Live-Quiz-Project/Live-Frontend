import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "@/common/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  connect,
  disconnect,
  endLqs,
  trigger,
} from "@/features/ws/store/slices/lqs";
import { resetMod } from "@/features/ws/store/slices/mod";
import { fetchParticipant } from "@/features/lobby/store/slice";
import { FiArrowDown } from "react-icons/fi";
import { PiPersonFill } from "react-icons/pi";
import wsat from "@/features/ws/utils/action-types";
import wss from "@/features/ws/utils/statuses";
import logo from "@/common/assets/logo.png";
import QR from "react-qr-code";
import FilledButton from "@/common/components/buttons/FilledButton";
import UserCard from "@/common/components/cards/UserCard";

export default function HostLobby() {
  const { lqsCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const lobby = useTypedSelector((state) => state.lobby);
  const lqs = useTypedSelector((state) => state.lqs);
  const mod = useTypedSelector((state) => state.mod);
  const [quizId, setQuizId] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    dispatch(connect());
    setQuizId(lqs.value.quizId);
    (async () => {
      await dispatch(fetchParticipant());
    })();
  }, []);

  useEffect(() => {
    if (mod.value.lqsStatus === wss.ENDING) {
      dispatch(resetMod());
      dispatch(disconnect());
      navigate(`/config/${quizId}`, { replace: true });
      return;
    }
  }, [mod.value.lqsStatus]);

  useEffect(() => {
    if (lobby.value.participants && lobby.value.participants.length > 0) {
      let newParticipants = [...lobby.value.participants];
      newParticipants.sort((a, b) => {
        if (isAscending) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      setParticipants(newParticipants);
    } else {
      setParticipants([]);
    }
  }, [lobby.value.participants]);

  function handleOnSort(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newParticipants = [...participants];
    newParticipants.sort((a, b) => {
      if (isAscending) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setParticipants(newParticipants);
    setIsAscending((prev) => !prev);
  }

  async function handleOnCancel(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    await dispatch(endLqs());
    navigate(`/config/${quizId}`, { replace: true });
  }

  function handleOnStartQuiz(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      trigger({
        type: wsat.START_LQS,
        payload: { id: lqs.value.id },
      })
    );
    navigate(`/host/lqs/${lqsCode}`);
  }

  return (
    <div className="h-screen py-16 bg-sky-blue">
      <div className="container grid gap-x-40 grid-cols-[auto_1fr] h-full mx-auto text-peach">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <img src={logo} alt="Logo" className="w-52 h-fit" />
            <p className="text-header-1 font-sans-serif">
              Head over to
              <br />
              {`${import.meta.env.VITE_BASE_URL}/join`}
              <br />
              and join with the code:
            </p>
            <p className="font-semibold text-8xl font-sans-serif">
              {lqs.value.code}
            </p>
          </div>
          <div className="space-y-10">
            <QR
              className="w-full p-4 rounded-xl bg-peach h-fit top-16"
              value={`${import.meta.env.VITE_BASE_URL}/join/${lqs.value.code}`}
              fgColor="#22668D"
              bgColor="transparent"
            />
            <div className="flex justify-between text-ocean-blue">
              <FilledButton
                className="bg-peach text-header-2"
                onClick={handleOnCancel}
              >
                Cancel
              </FilledButton>
              <FilledButton
                className="bg-peach text-header-2"
                onClick={handleOnStartQuiz}
              >
                Start Live Quiz
              </FilledButton>
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <div className="absolute right-0 flex items-center justify-end space-x-6 -top-10 text-header-1">
            <div className="flex items-center space-x-1">
              <PiPersonFill className="w-6 h-6" />
              <p className="font-sans-serif">{participants.length}</p>
            </div>
            <button
              onClick={handleOnSort}
              className="flex items-center space-x-1 font-serif"
            >
              <p>Aa</p>
              <FiArrowDown
                className={`${
                  isAscending && "rotate-180"
                } w-6 h-6 transition-all duration-300`}
              />
            </button>
          </div>
          <div className="h-full overflow-auto">
            <div className="flex flex-wrap items-start gap-5">
              {participants.map((participant: User) => (
                <UserCard key={participant.id} user={participant} size="m" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
