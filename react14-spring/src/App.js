import './App.css';

import React from 'react';
// <BrowserRouter>와 동일한 역할의 컴포넌트로 라우팅 처리를 위한 컴포넌트 랩핑에 사용된다.
import { HashRouter } from 'react-router-dom';
// 라우터 처리를 위한 컴포넌트 임포트
import { Route, Routes } from 'react-router-dom';

import MyList from './components/MyList';
import MyView from './components/MyView';
import MyWrite from './components/MyWrite';

/* 공통링크로 사용할 컴포넌트
차후 Spring Boot 프로젝트로 배포하면 React로 만든 페이지와 Spring에서 만든 페이지를 오갈 수 있다. */
const TopNavi = () => {
  return(
    <nav>
      <table border="1" width="90%">
        <tr>
          <td style={{ textAlign: 'center' }}>
            <a href='/'>Main</a> | 
            <a href='/crud/index.html'>React CRUD</a> | 
            <a href='/boardList.do'>Spring Board</a> | 
            <a href='/rboard/index.html'>React Board</a>
          </td>
        </tr>
      </table>
    </nav>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <TopNavi />
        <Routes>
          <Route path='' element={<MyList />} />
          <Route path='/list' element={<MyList />} />
          <Route path='/view'>
            <Route path=':num' element={<MyView />} />
          </Route>
          <Route path='/write' element={<MyWrite />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;