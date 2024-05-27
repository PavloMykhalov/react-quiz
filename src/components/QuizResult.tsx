import { Question } from "../services/quizService";

type Props = {
  score: number;
  questions: Question[];
  onRetry: () => void;
}

export default function QuizResult({
  score,
  questions,
  onRetry,
}: Props) {
  return (
    <section className="flex flex-col w-full items-center gap-3 text-center">
      <h1 className="text-4xl">Quiz Results</h1>
      <div className="flex gap-10 justify-between mb-8">
        <div className="flex flex-col gap-5 p-2 h-40 w-60 border rounded-md">
          <p className="text-xl">
            Your score:
          </p>
          <p className="text-6xl">
            {score}
          </p>
        </div>
        <div className="flex flex-col gap-5 p-2 h-40 w-60 border rounded-md">
          <p className="text-xl">
            Number of questions:
          </p>
          <p className="text-6xl">
            {questions.length}
          </p>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="h-10 border rounded-md bg-green-500 text-white w-1/4 hover:bg-green-700 duration-300"
      >
        Retry one more time
      </button>
    </section>
  );
}
