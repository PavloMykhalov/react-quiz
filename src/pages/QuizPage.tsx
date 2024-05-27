import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Quiz, getQuiz } from "../services/quizService";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";
import Loader from "../components/Loader";
import iconHome from "../../public/assets/icon-home.svg";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getQuiz(id)
      .then((fetchedQuiz) => {
        if (fetchedQuiz !== null) {
          setQuiz(fetchedQuiz);
          setTimeLeft(fetchedQuiz.timer * 60); // Ініціалізація таймера
        } else {
          console.error("Quiz not found");
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return; // Не запускати таймер, якщо час не ініціалізовано

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft !== null ? prevTimeLeft - 1 : 0));
    }, 1000);

    if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }

    return () => clearInterval(timerId);
  }, [timeLeft, showResult]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    let updatedScore = score; 
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswerId) {
      updatedScore += currentQuestion.points || 1;
      setScore(updatedScore); 
    }

    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      localStorage.setItem(`quizScore-${id}`, updatedScore.toString()); 
      setShowResult(true);
    }
  };

  const handleAnswer = (selectedAnswerId: string) => {
    setSelectedAnswer(selectedAnswerId);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setTimeLeft((quiz?.timer || 0) * 60);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-3 w-1/2">
      <Link to="/" className="flex items-center w-6 h-6 border hover:border-gray-500 rounded-md">
        <img
          src={iconHome}
          alt="Back to home page"
          className="rounded-full w-6 h-6 duration-300"
        />
      </Link>

      {currentQuestion && !showResult && (
        <>
          <h1 className="font-bold text-4xl">
            {quiz?.title}
          </h1>
          <p className="font-bold text-xl">
            Time left: {Math.floor((timeLeft ?? 0) / 60)}:{((timeLeft ?? 0) % 60).toString().padStart(2, '0')}
          </p>
          <QuizQuestion
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            onNext={handleNextQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
          />
        </>
      )}

      {showResult && quiz && (
        <QuizResult
          score={score}
          questions={quiz.questions}
          onRetry={handleRetryQuiz}
        />
      )}
    </section>
  );
}
