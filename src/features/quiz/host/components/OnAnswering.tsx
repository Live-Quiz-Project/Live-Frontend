type Props = {
  question: Question;
  options: Option[];
  timeLeft: number;
};

export default function OnAnswering({ question, options, timeLeft }: Props) {
  return (
    <div>
      <div>{question.content}</div>
      {options.map((option) => (
        <button key={option.id} className="p-2 border border-white rounded-md">
          {option.content}
        </button>
      ))}
      <div>{timeLeft}</div>
    </div>
  );
}
