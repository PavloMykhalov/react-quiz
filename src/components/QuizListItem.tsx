import { Quiz } from "../services/quizService";

type Props = {
  quiz: Quiz,
  handlePlay: (id: string) => void,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
}

export default function QuizListItem({
  quiz,
  handlePlay,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <li className="flex items-center justify-between gap-4 p-3 border rounded-md" key={quiz.id}>
      <h2 className="font-bold text-2xl">
        {quiz.title}
      </h2>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handlePlay(quiz.id)}
          className="p-2 rounded-full hover:bg-gray-400 duration-300"
        >
          <img
            src="src/assets/icon-play.svg"
            alt="Play icon"
          />
        </button>
        <button
          onClick={() => handleEdit(quiz.id)}
          className="p-2 rounded-full hover:bg-gray-400 duration-300"
        >
          <img
            src="src/assets/icon-edit.svg"
            alt="Edit icon"
          />
        </button>
        <button
          onClick={() => handleDelete(quiz.id)}
          className="p-2 rounded-full hover:bg-gray-400 duration-300"
        >
          <img
            src="src/assets/icon-delete.svg"
            alt="Delete icon"
          />
        </button>
      </div>
    </li>
  );
}