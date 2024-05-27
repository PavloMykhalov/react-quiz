import RatingItem from "./RatingItem";
import iconGold from "../../public/assets/icon-trophy-gold.svg";
import iconSilver from "../../public/assets/icon-trophy-silver.svg";
import iconBronze from "../../public/assets/icon-trophy-bronze.svg";

type Props = {
  ratings: {
    title: string;
    score: number;
  }[];
};

const trophyImages = [
  iconGold,
  iconSilver,
  iconBronze,
];

export default function RatingTable({ ratings }: Props) {
  return (
    <table className="table-auto w-full border border-collapse">
      <thead>
        <tr className="bg-green-600 text-white border-b">
          <th className="border-r p-2">Position</th>
          <th className="border-r p-2">Quiz Name</th>
          <th className="p-2">Score</th>
        </tr>
      </thead>
      <tbody>
        {ratings.map((rating, index) => (
          <RatingItem
            key={`${rating.score}-${rating.title}`}
            quizName={rating.title}
            score={rating.score}
            position={index >= 3 ? `${index + 1}` : ''}
            trophyImage={index < 3 ? trophyImages[index] : ""}
          />
        ))}
      </tbody>
    </table>
  );
}
