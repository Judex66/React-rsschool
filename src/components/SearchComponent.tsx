import { useState } from 'react';
interface Props {
  searchValue: (search: string) => void;
}
export default function SearchComponent({ searchValue }: Props) {
  const [search, setSearch] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
    localStorage.setItem('searchValue', e.target.value.trim());
  };
  return (
    <>
      <input
        type="text"
        className="searchPlace"
        defaultValue={search}
        placeholder="Search..."
        onChange={handleChange}
      />
      <button onClick={() => searchValue(search)}>Search</button>
    </>
  );
}
