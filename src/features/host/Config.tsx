import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createLqs, resetLqs } from "@/features/ws/store/slices/lqs";
import { isAxiosError } from "axios";
import { resetMod } from "@/features/ws/store/slices/mod";
import FilledButton from "@/common/components/buttons/FilledButton";
import BaseAccordion from "@/common/components/accordions/BaseAccordion";
import BaseSwitch from "@/common/components/switches/BaseSwitch";
import logo from "@/common/assets/logo.png";

export default function Config() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const [viewLeaderboardDuringQuestions, setViewLeaderboardDuringQuestions] =
    useState<boolean>(false);
  const [viewLeaderboardBetweenQuestions, setViewLeaderboardBetweenQuestions] =
    useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(false);
  const [colorlessOptions, setColorlessOptions] = useState<boolean>(false);
  const { quizId } = useParams();

  useEffect(() => {
    dispatch(resetLqs());
    dispatch(resetMod());
  }, []);

  async function handleStart(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!quizId) return;
    const res = await dispatch(createLqs(quizId)).unwrap();
    if (isAxiosError(res)) {
      console.error(res);
      return;
    } else if (res instanceof Error) {
      console.error(res as Error);
      return;
    }
    navigate(`/host/lobby/${res.code}`);
  }

  return (
    <div className="flex items-center justify-center h-screen text-white bg-ocean-blue">
      <div className="container flex flex-col items-center justify-center space-y-16">
        <div className="flex flex-col items-center space-y-6">
          <img src={logo} alt="Logo" className="w-52 h-fit" />
          <h1 className="font-serif text-header-1">Live quiz configuration</h1>
        </div>
        <div className="w-1/2 space-y-4 font-sans-serif">
          <BaseAccordion init={true}>
            <BaseAccordion.Head>
              <p className="inline-flex items-center h-10 font-medium text-header-1">
                Participants can view leaderboard
              </p>
            </BaseAccordion.Head>
            <BaseAccordion.Body>
              <div className="indent-4 text-header-3">
                <div className="flex items-center justify-between py-1">
                  <p className="">During questions</p>
                  <BaseSwitch
                    checked={viewLeaderboardDuringQuestions}
                    setChecked={setViewLeaderboardDuringQuestions}
                    className="!h-6"
                  />
                </div>
                <div className="flex items-center justify-between py-1">
                  <p className="">Between questions</p>
                  <BaseSwitch
                    checked={viewLeaderboardBetweenQuestions}
                    setChecked={setViewLeaderboardBetweenQuestions}
                    className="!h-6"
                  />
                </div>
              </div>
            </BaseAccordion.Body>
          </BaseAccordion>
          <BaseAccordion init={true}>
            <BaseAccordion.Head>
              <p className="inline-flex items-center h-10 font-medium text-header-1">
                Shuffle
              </p>
            </BaseAccordion.Head>
            <BaseAccordion.Body>
              <div className="indent-4 text-header-3">
                <div className="flex items-center justify-between py-1">
                  <p className="">Shuffle questions</p>
                  <BaseSwitch
                    checked={shuffleQuestions}
                    setChecked={setShuffleQuestions}
                    className="!h-6"
                  />
                </div>
                <div className="flex items-center justify-between py-1">
                  <p className="">Shuffle options</p>
                  <BaseSwitch
                    checked={shuffleOptions}
                    setChecked={setShuffleOptions}
                    className="!h-6"
                  />
                </div>
              </div>
            </BaseAccordion.Body>
          </BaseAccordion>
          <div className="flex items-center justify-between h-10">
            <p className="font-medium text-header-1">Colorless options</p>
            <BaseSwitch
              className="!h-7"
              checked={colorlessOptions}
              setChecked={setColorlessOptions}
            />
          </div>
        </div>
        <FilledButton
          className="!px-12 bg-orange text-header-2"
          onClick={handleStart}
        >
          Start
        </FilledButton>
      </div>
    </div>
  );
}
