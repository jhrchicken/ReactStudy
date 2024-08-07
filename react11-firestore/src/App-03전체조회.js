import './App.css';
import { firestore } from './firestoreConfig';
// 컬렉션과 도큐먼트를 얻어오기 위한 함수 임포트
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';

function App() {
  // 데이터를 저장할 State 생성
  const [showData, setShowData] = useState([]);

  // 컬렉션 정보 조회
  const getCollection = async() => {
    let trArray = [];
    // 컬렉션명으로 지정된 하위 도큐먼트를 얻어온다.
    const querySnapshot = await getDocs(collection(firestore, 'members'));
    // 도큐먼트의 개수만큼 반복한다.
    querySnapshot.forEach((doc) => {
      // 도큐먼트를 하나씩 인출한다.
      let memberInfo = doc.data();
      // <tr> 태그로 구성하여 배열에 저장한다.
      trArray.push (
        <tr key={doc.id}>
          <td className='cen'>{doc.id}</td>
          <td className='cen'>{memberInfo.pass}</td>
          <td className='cen'>{memberInfo.name}</td>
          <td className='cen'>{memberInfo.regdate}</td>
        </tr>
      );
    });
    // 파싱된 데이터를 통해 State를 변경하고 새롭게 렌더링한다.
    setShowData(trArray);
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>전체조회하기</h3>
      <button type='button' onClick={getCollection}>전체조회</button>
      {
        showData.length === 0 ? null : 
          <table className='table table-bordered'>
            <thead>
              <tr className='text-center'>
                <th>아이디</th>
                <th>비밀번호</th>
                <th>이름</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {showData}
            </tbody>
          </table>
      }
    </div>
  );
}

export default App;
