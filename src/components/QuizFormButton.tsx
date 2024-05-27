type Props = {
  isEditing: boolean,
}

export default function QuizFormButton({ isEditing }: Props) {
  return (
    <button
      type="submit"
      className="self-center w-1/4 py-3 border rounded-md bg-green-500 text-white hover:bg-green-700 transition duration-300"
    >
      {isEditing ? 'Save' : 'Create'}
    </button>
  );
}