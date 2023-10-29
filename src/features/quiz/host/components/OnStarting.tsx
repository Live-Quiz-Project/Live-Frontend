type Props = {
  timeLeft: number;
};

export default function OnStarting({ timeLeft }: Props) {
  return <div>{timeLeft}</div>;
}
