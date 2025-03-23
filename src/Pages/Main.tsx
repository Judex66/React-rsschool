import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div>
        <Link to="/React-rsschool/Optimization">Optimization</Link>
      </div>
      <div>
        <Link to="/React-rsschool/NoneOptimization">NoneOptimization</Link>
      </div>
    </>
  );
}

export default Home;
