import './App.css';
import Optimization from './Pages/Optimization';
import NoneOptimization from './Pages/NoneOptimization';
import Home from './Pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/NoneOptimization',
      element: <NoneOptimization />,
    },
    {
      path: '/Optimization',
      element: <Optimization />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
