import './App.css';
import Optimization from './Pages/Optimization';
import NoneOptimization from './Pages/NoneOptimization';
import Home from './Pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: '/React-rsschool',
      element: <Home />,
    },
    {
      path: '/React-rsschool/NoneOptimization',
      element: <NoneOptimization />,
    },
    {
      path: '/React-rsschool/Optimization',
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
