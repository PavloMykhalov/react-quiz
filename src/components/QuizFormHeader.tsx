type Props = {
  isEditing: boolean,
}

export default function QuizFormHeader({ isEditing }: Props) {
  return (
    <h1 className="text-center text-2xl font-bold">
      {isEditing ? 'Edit your quiz' : 'Create new quiz'}
    </h1>
  );
}