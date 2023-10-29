import { Dispatch, FormEvent } from "react";

type Props = {
  className?: string;
  checked: boolean;
  setChecked: Dispatch<React.SetStateAction<any>>;
};

export default function BaseSwitch({ className, checked, setChecked }: Props) {
  function handleOnSwitch(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setChecked((prev: boolean) => !prev);
  }

  return (
    <button
      onClick={handleOnSwitch}
      className={`relative h-10 aspect-[2/1] rounded-full transition-all duration-300 ${
        checked ? "bg-pastel-orange" : "bg-gray"
      } ${className}`}
    >
      <span
        className={`absolute top-0 block border-2 bg-white h-full rounded-full aspect-square transition-all duration-300 ${
          checked ? "left-1/2 border-pastel-orange" : "left-0 border-gray"
        }`}
      />
    </button>
  );
}
