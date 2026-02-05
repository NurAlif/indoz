import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Foundation Ready - Agent 02 will build navigation</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
