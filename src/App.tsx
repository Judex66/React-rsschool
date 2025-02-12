import './App.css';
import '../styles/LoadingAnimation.css';
// import ResultComponent from './components/ResultComponent';

import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Character from './pages/Character';
import ErrorPage from './pages/404';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/character/:id" element={<Character />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
