import './App.css';
import { firestore } from './firestoreConfig';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';

function App() {
  // 검색 데이터 저장을 위한 State
  const [showData, setShowData] = useState([]);

  // 검색을 위한 함수. 검색필드와 검색어를 매개변수로 정의
  const getCollection = async (sField, sStr) => {
    let getRows = [];

    if (sField === 'id') {
      // 아이디를 통한 검색은 도큐먼트를 찾는 것으로 검색하면 된다.
      const docRef = doc(firestore, 'members', sStr);
      // 참조값을 얻은 후 도큐먼트를 찾는다.
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // 문서의 데이터를 변수에 저장한다.
        getRows.push(docSnap.data());
      }
      else {
        console.log('No Such Document!');
      }
    }
    else if (sField === 'name') {
      // 이름으로 검색하는 경우에는 Where, query 함수를 사용한다.
      // 컬렉션을 먼저 얻어온다.
      const membersRef = collection(firestore, 'members');
      // query 함수를 통해 where(조건)에 맞는 데이터를 검색한다.
      const q = query(membersRef, where('name', '==', sStr));
      const querySnapshot = await getDocs(q);
      // 조건에 일치하는 도큐먼트는 2개 이상일 수 있으므로 반복한다.
      querySnapshot.forEach((doc) => {
        getRows.push(doc.data());
      });
    }

    // 검색된 개수만큼 <tr> 태그를 추가한다.
    let trArray = [];
    getRows.forEach((row) => {
      trArray.push (
        <tr key={row.id}>
          <td className='cen'>{row.id}</td>
          <td className='cen'>{row.pass}</td>
          <td className='cen'>{row.name}</td>
          <td className='cen'>{row.regdate}</td>
        </tr>
      );
    });
    setShowData(trArray);
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>검색하기</h3>

      <form onSubmit={(event) => {
        event.preventDefault();
        // 폼값을 submit하면 입력값을 받은 후 검색을 위한 함수를 호출한다.
        let sf = event.target.searchField.value;
        let ss = event.target.searchStr.value;
        getCollection(sf, ss);
      }}>
        <div className='input-group' id='myForm'>
          <select name='searchField' className='form-control'>
            <option value='id'>아이디</option>
            <option value='name'>이름</option>
          </select>
          <input type='text' name='searchStr' className='form-control' />
          <button type='submit' className='btn btn-secondary'>전체조회</button>
        </div>
      </form>
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
