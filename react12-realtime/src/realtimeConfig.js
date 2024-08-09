import { initializeApp } from 'firebase/app';
// Realtime Database 임포트
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  // Realtime Database는 API Key 이외 databaseURL이 하나 더 필요하다. 콘솔 상단에서 확인할 수 있다.
  databaseURL: process.env.REACT_APP_databaseURL
};

// App을 초기화하고 Realtime을 사용할 준비를 한다.
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);

export { realtime };