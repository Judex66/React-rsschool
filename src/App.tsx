import './App.css';
import '../styles/LoadingAnimation.css';
import ResultComponent from './components/ResultComponent';
import ErrorBoundary from './CatchError/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <ResultComponent />
      </ErrorBoundary>
    </>
  );
}

export default App;
