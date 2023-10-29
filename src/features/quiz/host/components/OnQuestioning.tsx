type Props = {
  question: Question;
  timeLeft: number;
};

export default function OnQuestioning({ question, timeLeft }: Props) {
  return (
    <div>
      <div>{question.content}</div>
      <div>{timeLeft}</div>
    </div>
  );
}
