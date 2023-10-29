type Props = {
  question: Question;
  answer: Answer;
};

export default function OnRevealingAnswer({ question, answer }: Props) {
  return (
    <div>
      <div>{question.content}</div>
      <div>{answer.content}</div>
    </div>
  );
}
