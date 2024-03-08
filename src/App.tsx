import { Route, Routes } from 'react-router-dom';

import Details from './pages/Details';
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="details" element={<Details />} />
    </Routes>
  );
}

export default App;
