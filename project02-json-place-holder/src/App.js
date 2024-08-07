import './App.css';
import React from "react";
import { useState } from 'react';
import AlbumsList from './common/AlbumsList';
import AlbumsView from './common/AlbumsView';

function App() {
  const [no, setNo] = useState(null);
  const [page, setPage] = useState(1);

  return (
    <div className="app">
      <h2>연락처 API 연동하기</h2>
      {/* 페이징 기능 구현 */}
      <form onSubmit={(event) => {
        event.preventDefault();
        setPage(event.target.elements.page.value);
      }}>
        <input type='text' name='page' placeholder='페이지를 입력하세요'></input>
        <input type='submit'></input>
      </form><br/>
      
      <div className='common'>
        {/* AlbumList에서는 리스트를 보여주고, 특정 앨범 클릭 시 no 상태 변경 */}
        <AlbumsList onChoose={(id) => {
          setNo(id);
        }} page={page} />
        {/* AlbumsView에서는 no 상태를 이용해 내용 출력 */}
        {
          no === null ? null : <AlbumsView no={no} />
        }
      </div>
    </div>
  );
}

export default App;
