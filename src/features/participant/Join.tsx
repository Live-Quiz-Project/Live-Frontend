import { isAxiosError } from "axios";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinLqs, resetLqs } from "@/features/ws/store/slices/lqs";
import { resetMod, setMod } from "@/features/ws/store/slices/mod";
import { LuQrCode } from "react-icons/lu";
import { HiOutlineHashtag } from "react-icons/hi";
import ss from "@/common/utils/async-store-statuses";
import logo from "@/common/assets/logo.png";

export default function Join() {
  const digitRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(resetLqs());
    dispatch(resetMod());
    digitRefs[0].current?.focus();
  }, []);

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    setError(null);
    if (e.key === "Backspace") {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      if (digits[index] === "" && index - 1 >= 0) {
        digitRefs[index - 1].current?.focus();
      }
    }
  }

  function handleOnInput(e: FormEvent<HTMLInputElement>, index: number) {
    e.preventDefault();
    setError(null);
    const newDigits = [...digits];
    if (e.currentTarget.value.length > 1) {
      let lastDigit = 0;
      for (let i = index; i < index + e.currentTarget.value.length; i++) {
        if (i > digitRefs.length - 1) break;
        newDigits[i] = e.currentTarget.value[i - index].toUpperCase();
        lastDigit = i;
      }
      setDigits(newDigits);
      if (lastDigit + 1 < digitRefs.length) {
        digitRefs[lastDigit + 1].current?.focus();
        return;
      }
      digitRefs[digitRefs.length - 1].current?.focus();
      return;
    }
    newDigits[index] = e.currentTarget.value.toUpperCase();
    setDigits(newDigits);
    if (index + 1 < digitRefs.length) {
      digitRefs[index + 1].current?.focus();
    }
  }

  async function joinQuiz(e?: FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    const code = digits.join("");
    digits.forEach((digit) => {
      if (!digit || !/^[A-Z]{2}\d{4}$/.test(code.toUpperCase())) {
        setError("Please enter a valid code");
        return;
      }
    });
    const res = await dispatch(joinLqs(code)).unwrap();
    if (isAxiosError(res)) {
      if (res.response?.status === 400) {
        setError("Not found");
      }
      return;
    } else if (res instanceof Error) {
      console.error(res as Error);
      return;
    }
    dispatch(
      setMod({
        curQ: res.curQ,
        status: res.status,
      })
    );
    if (res.status === ss.IDLE) {
      navigate(`/participant/lobby/${code}`);
    } else {
      navigate(`/participant/lqs/${code}`);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen text-white bg-ocean-blue">
      <form
        onSubmit={joinQuiz}
        className="container flex flex-col items-center justify-center space-y-16"
      >
        <div className="space-y-6 w-max">
          <div className="flex items-end justify-between space-x-12">
            <img src={logo} alt="Logo" className="w-52" />
            <h1 className="mb-1 font-serif text-header-1">Enter Quiz Code</h1>
          </div>
          <div className="relative flex flex-col items-center px-5 py-2 border rounded-full border-orange bg-peach">
            <div className="flex justify-center h-10 w-full space-x-1.5">
              <HiOutlineHashtag className="w-auto h-full text-orange" />
              {digits.map((digit, i) => (
                <label
                  key={i}
                  className="relative h-full aspect-square font-sans-serif text-header-2"
                >
                  <input
                    ref={digitRefs[i]}
                    className="inline-flex items-center justify-center w-full h-full text-transparent rounded-md bg-pastel-orange/20 focus:outline-none focus:ring-1 ring-orange"
                    onKeyDown={(e) => handleOnKeyDown(e, i)}
                    onChange={(e) => handleOnInput(e, i)}
                    value=""
                    type="text"
                  />
                  <p className="absolute -translate-x-1/2 -translate-y-1/2 text-orange top-1/2 left-1/2">
                    {digit}
                  </p>
                </label>
              ))}
              <button className="">
                <LuQrCode className="w-auto h-full aspect-square text-orange" />
              </button>
            </div>
            {error && (
              <p className="absolute font-sans-serif text-red top-full text-body-1">
                {error}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
