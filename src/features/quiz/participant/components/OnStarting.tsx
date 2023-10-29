type Props = {
  timeLeft: number;
};

export default function OnStarting({ timeLeft }: Props) {
  return (
    <div className="">
      <div className=""></div>
      {timeLeft}
    </div>
  );
}
