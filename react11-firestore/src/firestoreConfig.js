// Firebase에서 생성한 API 정보를 저장해 놓은 파일

// 파이어베이스 초기화 및 사용을 위한 함수 임포트
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 본인의 API Key와 관련 정보(.env 파일 생성 전)
// const firebaseConfig = {
//   apiKey: "AIzaSyDUpEAb9dyawgziM3I2gRxAV4Z493o4M_c",
//   authDomain: "reactapp202408-b8c43.firebaseapp.com",
//   projectId: "reactapp202408-b8c43",
//   storageBucket: "reactapp202408-b8c43.appspot.com",
//   messagingSenderId: "129322912315",
//   appId: "1:129322912315:web:b6d66bac626da84029ea1e",
//   measurementId: "G-VMWGGPB6MS"
// };

// .env 파일 생성 후
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);
// 파이어스토어 객체 생성 및 내보내기
const firestore = getFirestore(app);
export { firestore };