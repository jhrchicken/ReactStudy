import React, { useEffect } from 'react';
import { useState } from 'react';

function AlbumsList(props) {
  // JSON 데이터를 저장하기 위한 State
  let [albumsData, setAlbumsData] = useState([]);

  // API 서버에 데이터 요청
  useEffect(function() {
    fetch(`https://jsonplaceholder.typicode.com/albums/${props.page}/photos`)
      .then((response) => response.json())
      .then((json) => setAlbumsData(json));
  }, [props.page]);

  // 출력하기 위해 lists에 저장
  let lists = [];
  for (let row of albumsData) {
    lists.push(
      <tr key={row.id}>
        <td><img src={row.url} alt={row.url}></img></td>
        <td><a href='/' onClick={(event) => {
          event.preventDefault();
          props.onChoose(row.id);
        }
        }>{row.title}</a></td>
      </tr>
    );
  }

  return (
    <div className="list">
      <table id="boardTable">
      <thead>
        <tr>
          <th>photo</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {lists}
      </tbody>
      </table>
    </div>
  );
}

export default AlbumsList;