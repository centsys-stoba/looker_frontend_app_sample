import { ComponentsProvider, Box, Space } from '@looker/components'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import Home from './pages/Home'
import QueryPage from './pages/Query'
import Navigation from './components/Navigation'
import EmbedPage from './pages/Embed'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: '/authenticated', Component: Home },
      { path: '/query', Component: QueryPage },
      { path: '/embed', Component: EmbedPage },
    ]
  },
]);

function Root() {
  return (
    <>
      <Space align="start">
        <Box width="100px">
          <Navigation />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Space>
    </>
  )
}

function App() {
  return (
    <>
      <ComponentsProvider>
        <RouterProvider router={router} >
        </RouterProvider>
      </ComponentsProvider>
    </>
  )
}

export default App