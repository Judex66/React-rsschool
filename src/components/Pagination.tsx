import { Link } from 'react-router-dom';
import '../styles/pagination.css';

interface Pagination {
  pagination: number;
  paginate: (pageNumber: React.SetStateAction<number>) => void;
}
export default function Pagination({ pagination, paginate }: Pagination) {
  const pageNumbers = [];

  for (let i = 1; i <= pagination; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination11">
      {pageNumbers.map((number, index) => (
        <Link key={index} className="page-item" to={`/?page=${number}`}>
          <a
            onClick={() => paginate(number)}
            style={{ textDecoration: 'none' }}
            className="page-link"
          >
            {number}
          </a>
        </Link>
      ))}
    </div>
  );
}
