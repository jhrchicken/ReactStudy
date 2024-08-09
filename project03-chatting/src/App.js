import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import ChatStart from './components/ChatStart';
import ChatMessage from './components/ChatMessage';

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<ChatStart />} />
      <Route path='/chat'>
        <Route index element={<ChatStart />} />
        <Route path='talk' element={<ChatMessage />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
