import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
// Structuring the App component
function App() {

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
