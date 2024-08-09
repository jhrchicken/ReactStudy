import './App.css';
import { useState, useEffect } from 'react';
import { storage } from './storageConfig';
import { ref, listAll, deleteObject } from 'firebase/storage';

function App() {
  // 스토리지 연결 및 참조 생성
  const listRef = ref(storage, '');

  // State : 파일목록, 삭제 후 렌더링을 위한 변수
  const [fileLists, setFileLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);
  
  useEffect(() => {
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res) => {
        // 폴더명 출력
        res.prefixes.forEach((folderRef) => {
          console.log('폴더', folderRef);
        });
        // 이미지 출력
        res.items.forEach((itemRef) => {
          // 이미지의 삭제를 얻기 위한 참조를 얻어온다.
          const deleteRef = ref(storage, itemRef.fullPath);
          // 파일 목록 추가
          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td><button type='button' onClick={(e) => {
                if (window.confirm('삭제할까요?')) {
                  deleteObject(deleteRef).then(() => {
                    console.log('파일삭제 성공');
                    // 삭제가 완료되면 새롭게 렌더링
                    setRenderFlag(!renderFlag);
                  })
                  .catch((error) => {
                    console.log('파일삭제 실패', error);
                  });
                }
              }}>삭제</button></td>
            </tr>
          );
        });
        // 파일 목록을 얻어온 후 State 변경
        setFileLists(fileRows);
      })
      .catch((error) => {
        console.log('파일목록 출력실패', error);
      });
  }, [renderFlag]);
  // 파일 삭제가 완료된 후 renderFlag를 변경하면 새롭게 렌더링되면서 useEffect도 재실행되어 목록을 새롭게 가져온다.

  console.log('렌더링');

  return(
    <div className='App'>
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 삭제</h3>

      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullPath</th>
            <th>name</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  );
}

export default App;