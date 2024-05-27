import { Quiz } from "../services/quizService";
import iconPlay from "../../public/assets/icon-play.svg";
import iconEdit from "../../public/assets/icon-edit.svg";
import iconDelete from "../../public/assets/icon-delete.svg";

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
            src={iconPlay}
            alt="Play icon"
          />
        </button>
        <button
          onClick={() => handleEdit(quiz.id)}
          className="p-2 rounded-full hover:bg-gray-400 duration-300"
        >
          <img
            src={iconEdit}
            alt="Edit icon"
          />
        </button>
        <button
          onClick={() => handleDelete(quiz.id)}
          className="p-2 rounded-full hover:bg-gray-400 duration-300"
        >
          <img
            src={iconDelete}
            alt="Delete icon"
          />
        </button>
      </div>
    </li>
  );
}