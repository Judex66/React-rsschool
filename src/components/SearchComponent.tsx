import { useState } from 'react';
interface Props {
  searchValue: (search: string) => void;
}
export default function SearchComponent({ searchValue }: Props) {
  const [search, setSearch] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
    console.log(e.target.value.trim());
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
