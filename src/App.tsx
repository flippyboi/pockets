import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Navigate replace to='/messages' />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
