import { Link } from "react-router-dom";

function Home() {
  return <>
    <div>
        <Link to="/Optimization">componentUsusal</Link>
      </div>
      <div>
        <Link to="/NoneOptimization">componentRHF</Link>
      </div>
  
  </>;
}

export default Home;
