import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import componentUsusal from './pages/Form1';
import componentRHF from './pages/Form2';
import Home from './pages/Home';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'componentUsusal',
        element: <componentUsusal />,
      },
      {
        path: 'componentRHF',
        element: <componentRHF />,
      },
    ],
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
