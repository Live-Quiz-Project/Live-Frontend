import { jsonServer } from "@/common/services/axios";
import { FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "@/features/auth/slice";
import { useNavigate } from "react-router-dom";
import { resetMod } from "./ws/store/slices/mod";
import { resetLqs } from "./ws/store/slices/lqs";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();
  const mockButtonClass = "p-2 rounded-md border border-white";

  useEffect(() => {
    dispatch(logOut());
    dispatch(resetLqs());
    dispatch(resetMod());
  }, []);

  async function mockLogIn(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const { data: users } = await jsonServer.get("/users", {
        params: {
          id: e.currentTarget.value,
        },
      });
      const { data } = await jsonServer.get("/quizzes", {
        params: {
          creatorId: users[0].id,
        },
      });

      if (data.length > 0) {
        dispatch(
          logIn({
            id: users[0].id,
            name: users[0].name,
            isHost: true,
          } as User)
        );
        navigate(`config/${data[0].id}`);
      } else {
        dispatch(
          logIn({
            id: users[0].id,
            name: users[0].name,
            isHost: false,
          } as User)
        );
        navigate({ pathname: "join" });
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl">Mock</h1>
      <p>Choose user to log in</p>
      <div className="flex gap-2">
        <button onClick={mockLogIn} value={1} className={mockButtonClass}>
          1
        </button>
        <button onClick={mockLogIn} value={2} className={mockButtonClass}>
          2
        </button>
        <button onClick={mockLogIn} value={3} className={mockButtonClass}>
          3
        </button>
        <button onClick={mockLogIn} value={4} className={mockButtonClass}>
          4
        </button>
      </div>
    </div>
  );
}
