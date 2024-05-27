type Props = {
  quizName: string;
  score: number;
  position: string;
  trophyImage: string;
};

export default function RatingItem({ quizName, score, position, trophyImage }: Props) {
  return (
    <tr className="text-center border">
      <td className="flex justify-center p-2">
        {trophyImage && (
          <img src={trophyImage} alt={`Medal ${position}`} className="h-8" />
        )}
        {position}
      </td>
      <td className="border p-2">{quizName}</td>
      <td className="border p-2">{score}</td>
    </tr>
  );
}
