import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 컴포넌트 모듈화 후 임포트
import RealtimeCRUD from './components/RealtimeCRUD';
import Listener from './components/Listener';
import ChatStart from './components/ChatStart.js';
import ChatMessage from './components/ChatMessage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RealtimeCRUD />} />
        <Route path='/crud' element={<RealtimeCRUD />} />
        <Route path='/listener' element={<Listener />} />
        <Route path='/chat'>
          <Route index element={<ChatStart />} />
          <Route path='talk' element={<ChatMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
