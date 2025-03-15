import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import СomponentRHF from './pages/Form2';
import СomponentUsusal from './pages/Form1';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/componentUsusal',
    element: <СomponentUsusal />,
  },
  {
    path: '/componentRHF',
    element: <СomponentRHF />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
