import { sdk } from '../src/helpers/CorsSession'
import { DataProvider } from '@looker/components-data'
import { ComponentsProvider } from '@looker/components'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import Home from './pages/Home'
import Query from './pages/Query'
import Navigation from './components/Navigation'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: '/authenticated', Component: Home },
      { path: '/query', Component: Query },
    ]
  },
]);

function Root() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <ComponentsProvider>
        <DataProvider sdk={sdk}>
          <RouterProvider router={router} >
          </RouterProvider>
        </DataProvider>
      </ComponentsProvider>
    </>
  )
}

export default App