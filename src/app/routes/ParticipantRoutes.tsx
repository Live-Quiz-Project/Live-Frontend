import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Index = lazy(() => import("@/features/participant"));
const Lobby = lazy(() => import("@/features/lobby/Participant"));

export default function ParticipantRoutes() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="lobby" element={<Lobby />} />
    </Routes>
  );
}
