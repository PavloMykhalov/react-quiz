import { useState } from "react";

type Props = {
  onSearch: (query: string) => void,
}

export default function QuizSearch({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    onSearch(query);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="px-4 border rounded-md h-12 w-full hover:border-gray-500 duration-300 placeholder-transparent peer"
        id="search"
        placeholder="Search for quizzes"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        style={{
          backgroundImage: `url('/src/assets/icon-search.svg')`,
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <label
        htmlFor="search"
        className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-gray-600"
      >
        Search for quizzes
      </label>
    </div>
  );
}
