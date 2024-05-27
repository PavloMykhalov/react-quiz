import { useState } from "react";
import { debounce } from 'lodash';
import iconSearch from "/assets/icon-search.svg";

type Props = {
  onSearch: (query: string) => void,
}

export default function QuizSearch({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleDebouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 1000);

  const handleSearch = (value: string) => {
    setQuery(value);
    handleDebouncedSearch(value);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="px-4 border rounded-md h-12 w-full hover:border-gray-500 duration-300 placeholder-transparent peer"
        id="search"
        placeholder="Search for quizzes"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          backgroundImage: `url(${iconSearch})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
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
