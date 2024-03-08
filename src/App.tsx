import { Route, Routes } from 'react-router-dom';

import Details from './pages/Details';
import Main from './pages/Main';

function App() {
  return (
    <div className="p-[4rem]">
      <Routes>
        <Route index element={<Main />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
