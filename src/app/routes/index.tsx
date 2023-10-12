import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/features/Loading";
import Home from "@/features/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Router>
          <Route index element={<Home />} />
        </Router>
      </Suspense>
    </BrowserRouter>
  );
}
