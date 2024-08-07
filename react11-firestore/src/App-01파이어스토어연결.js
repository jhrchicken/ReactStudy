import './App.css';
// 파이어베이스 객체 임포트
import { firestore } from './firestoreConfig';
// 새로운 문서를 입력하거나 읽을 때 사용하는 함수 임포트
import { doc, setDoc, getDoc } from 'firebase/firestore'

function App() {
  // 파이어스토어 연결 확인
  console.log('firestore', firestore);

  // 도큐먼트 추가
  const addMessage = async () => {
    /*
      컬렉션 (테이블과 유사) : Korea
      도큐먼트(레코드와 유사) : Seoul
      하위 데이터는 JSON객체 형식으로 작성하면 된다. 데이터는 정형화 되어있지 않으므로 도큐먼트 별로 서로 다를 수 있다.
    */
    await setDoc(doc(firestore, 'Korea', 'Seoul'),  {
      gu: '종로구',
      dong: '관철동',
      hotplace: '더조은IT',
      subway: '종각역'
    });
    console.log('입력성공');
  }

  // 도큐먼트 읽기
  const getMessage = async () => {
    // 입력된 컬렉션과 도큐먼트를 통해 문서의 참조값을 가져온다.
    const docRef = doc(firestore, 'Korea', 'Seoul');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // 해당 도큐먼트가 존재하면 콘솔에 내용 출력
      console.log('Document Data : ', docSnap.data());
    }
    else {
      console.log('No such document!');
    }
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>firebase 연결</h3>
      <input type='button' value='입력' onClick={addMessage} />
      <input type='button' value='읽기' onClick={getMessage} />
    </div>
  );
}

export default App;
