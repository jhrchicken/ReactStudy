import './App.css';
import { storage } from './storageConfig';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  // Firebase Storage 연결 및 확인
  const storageRef = ref(storage);
  console.log('storageRef', storageRef);

  // ref()를 호출할 때 두번째 인수를 전달하여 해당 경로와 같이 트리에서 하위 위치를 가리키는 참조를 만들 수 있다.
  const imagesRef1 = ref(storage, 'images');
  const imagesRef2 = ref(storage, 'images/myFile.jpg');

  // parent : 한 단계 상위 경로로 이동
  const imagesRef3 = imagesRef2.parent;
  // root : 최상위 경로로 이동
  const imagesRef4 = imagesRef2.root;

  // fullpath, name, bucket 속성으로 참조를 조사하여 파일의 위치를 파악할 수 있다.
  console.log('ref 객체', imagesRef1);
  console.log('경로1', imagesRef1.fullPath);
  console.log('경로2', imagesRef2.fullPath, imagesRef2.name);
  console.log('경로3', imagesRef3.fullPath);
  console.log('경로4', imagesRef4.fullPath);
  
  return (
    <div className="App">
      <h2>Firebase - Storage App</h2>
      <h3>스토리지 접속 및 파일 업로드</h3>
      <p>파일을 선택하면 즉시 업로드 됩니다.</p>
      <input type='file' name='myfile' multiple onChange={(e) => {
        // 파일 업로드 1 : 스토리지 접속을 위한 참조값과 파일명을 통해 업로드한다.
        // const imageRef = ref(storage, e.target.files[0].name);
        // uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
        //   console.log('업로드 성공', snapshot);
        // });

        // 파일 업로드 2 : 파일은 2개 이상 선택이 가능하므로 배열의 인덱스로 접근한다.
        for (let i = 0; i < e.target.files.length; i++) {
          const imageRef = ref(storage, e.target.files[i].name);
          uploadBytes(imageRef, e.target.files[i]).then((snapshot) => {
            console.log('업로드 성공', snapshot);
          });
        }
      }} />
    </div>
  );
}

export default App;
