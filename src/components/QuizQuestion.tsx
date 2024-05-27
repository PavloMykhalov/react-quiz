import { Question } from "../services/quizService";

type Props = {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onAnswer: (selectedAnswerId: string) => void;
  selectedAnswer: string | null;
};

export default function QuizQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onAnswer,
  selectedAnswer,
}: Props) {
  return (
    <section className="flex flex-col gap-3 w-full">
      <h1>Quiz name: {question.text}</h1>
      <h2>Question {currentQuestionIndex + 1} of {totalQuestions}:</h2>
      <ul className="flex flex-col gap-1">
        {question.answers.map(answer => (
          <li 
            key={answer.id} 
            className={`flex gap-3 items-center bg-gray-300 rounded-md p-3 hover:bg-gray-400 duration-300 cursor-pointer ${selectedAnswer === answer.id ? 'bg-gray-500' : ''}`}
            onClick={() => onAnswer(answer.id)}
          >
            <input 
              type="radio"
              id={answer.id}
              name="answer"
              value={answer.id}
              checked={selectedAnswer === answer.id}
              onChange={() => onAnswer(answer.id)}
            />
            <label htmlFor={answer.id}>{answer.text}</label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-3">
        <button 
          onClick={onNext} 
          className="p-3 w-24 text-white bg-green-500 rounded-md hover:bg-green-700 duration-300"
        >
          Next
        </button>
      </div>
    </section>
  );
}
