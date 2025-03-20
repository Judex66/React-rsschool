import { Link } from "react-router-dom";

function Home() {
  return <>
    <div>
        <Link to="/Optimization">Optimization</Link>
      </div>
      <div>
        <Link to="/NoneOptimization">NoneOptimization</Link>
      </div>
  
  </>;
}

export default Home;
