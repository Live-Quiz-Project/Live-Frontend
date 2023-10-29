import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Lobby = lazy(() => import("@/features/lobby/Host"));

export default function HostRoutes() {
  return (
    <Routes>
      <Route path=":t" element={<Lobby />} />
    </Routes>
  );
}
