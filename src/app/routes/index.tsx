import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "@/features/Loading";
import Home from "@/features/Home";

const HostLobby = lazy(() => import("@/features/lobby/Host"));
const HostLiveQuiz = lazy(() => import("@/features/quiz/host"));
const ParticipantLobby = lazy(() => import("@/features/lobby/Participant"));
const ParticipantLiveQuiz = lazy(() => import("@/features/quiz/participant"));
const Join = lazy(() => import("@/features/participant/Join"));
const Config = lazy(() => import("@/features/host/Config"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Router>
          <Route index element={<Home />} />
          <Route path="participant">
            <Route path="lobby/:lqsCode" element={<ParticipantLobby />} />
            <Route path="lqs/:lqsCode" element={<ParticipantLiveQuiz />} />
          </Route>
          <Route path="host">
            <Route path="lobby/:lqsCode" element={<HostLobby />} />
            <Route path="lqs/:lqsCode" element={<HostLiveQuiz />} />
          </Route>
          <Route path="join" element={<Join />} />
          <Route path="config/:quizId" element={<Config />} />
        </Router>
      </Suspense>
    </BrowserRouter>
  );
}
