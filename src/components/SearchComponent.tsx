import { useState } from 'react';
interface Props {
  searchValue: (search: string) => void;
  charQuery: string;
}
export default function SearchComponent({ searchValue, charQuery }: Props) {
  const [search, setSearch] = useState(charQuery);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };
  return (
    <>
      <input
        type="text"
        className="searchPlace"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button onClick={() => searchValue(search)}>Search</button>
    </>
  );
}
