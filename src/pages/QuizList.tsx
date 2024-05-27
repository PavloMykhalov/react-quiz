import { useEffect, useState } from "react";
import { Quiz, deleteQuiz, getQuizzes } from "../services/quizService";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import QuizSearch from "../components/QuizSearch";
import QuizListItem from "../components/QuizListItem";
import RatingTable from "../components/RatingTable";

export default function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getQuizzes()
      .then(data => {
        const updatedQuizzes = data.map(quiz => {
          const savedScore = localStorage.getItem(`quizScore-${quiz.id}`);
          return {
            ...quiz,
            score: savedScore ? parseInt(savedScore) : 0
          };
        });
        
        setQuizzes(updatedQuizzes);
        setFilteredQuizzes(updatedQuizzes);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quizzes:", error);
        setError("Error fetching quizzes. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    filterQuizzes(searchQuery);
  }, [quizzes]);

  const filterQuizzes = (query: string) => {
    const filtered = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterQuizzes(query); 
  };

  const handleDelete = (id: string) => {
    deleteQuiz(id)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      })
      .catch(error => {
        console.error("Error deleting quiz:", error);
      });
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handlePlay = (id: string) => {
    navigate(`/quiz/${id}`);
  };

  const ratings = quizzes.map(quiz => ({
    title: quiz.title,
    score: quiz.score,
  }))

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex gap-3 w-3/4">
      <ul className="flex flex-col gap-3 w-3/4">
        {filteredQuizzes.length === 0 && (
          <p className="text-xl text-red-600">There is no such quiz. Try another title</p>
        )}
        {filteredQuizzes.map(quiz => (
          <QuizListItem 
            key={quiz.id} 
            quiz={quiz}
            handlePlay={handlePlay}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
        <Link to="/create" className="block p-4 w-full text-white text-xl bg-green-600 rounded-md text-center hover:bg-green-700 transition-all duration-300">
          Create new quiz
        </Link>
      </ul>
      
      <div className="flex flex-col gap-4 w-2/5">
        <QuizSearch onSearch={handleSearch} />
        <RatingTable ratings={ratings} />
      </div>
    </section>
  );
}
