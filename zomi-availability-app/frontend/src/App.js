import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from "./components/Header/Header";
import ChartsPage from "./components/ChartsPage/ChartsPage";
import HomePage from "./components/HomePage/HomePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Header/>,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <HomePage/> },
            { path: 'charts', element: <ChartsPage/>  },
        ],
    },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
