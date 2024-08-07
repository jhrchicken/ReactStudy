import React, { useEffect, useState } from 'react';

function AlbumsView(props) {
  // JSON 데이터를 저장하기 위한 State
  let [albumsData, setAlbumsData] = useState({});

  // API 요쳥
  // ****** API 요청 URL 분석하는 연습 필요 ******
  useEffect(function() {
    fetch("https://jsonplaceholder.typicode.com/photos/" + props.no)
    .then((response) => response.json())
    .then((json) => setAlbumsData(json));
  }, [props.no]);

  return (
    <div className="view">
      <p>albumId : {albumsData.albumId}</p>
      <hr />
      <p>id : {albumsData.id}</p>
      <hr />
      <p>title : {albumsData.title}</p>
      <hr />
      <p>url : {albumsData.url}</p>
      <hr />
      <p>thumbnailUrl : <img src={albumsData.thumbnailUrl} alt=''></img></p>
    </div>
  );
}

export default AlbumsView;
