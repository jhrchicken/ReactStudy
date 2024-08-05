import './App.css';
import { useState, useRef } from 'react';

/*
  useRef : 컴포넌트의 생명주기 안에서 값을 유지한다. 즉 새롭게 렌더링 되더라도 값이 변하지 않고 유지된다. State와 동일하게 값을 마음대로 변경할 수 있지만, 값이 변경될 때 렌더링은 되지 않는다. 즉 변경 시 렌더링은 되지 않아야 할 상황에 유용하다. 또한 JS의 getElementById()와 유사하게 DOM 요소에 접근할 수 있다.
*/
function App() {
  console.log('렌더링 되었습니다');

  // State 생성
  const [count, setCount] = useState(0);
  // UseRef를 통해 변수 생성
  const countRef = useRef(0);
  /* useRef를 통해 생성한 변수는 current라는 key를 가진 객체를 반환한다. 즉 접근 시에는 "current.변수명"으로 기술해야 한다. */

  // State인 count를 1 증가시킨다.
  const increaseCountState = () => {
    setCount(count + 1);
  }

  // Ref로 선언된 값을 1 증가시킨다.
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref', countRef.current);
  }

  return (
    <div className="App">
      <p>State : {count}</p>
      <p>Ref : {countRef.current}</p>
      {/* 버튼을 누를 때마다 State가 변경되므로 화면이 새롭게 렌더링된다. */}
      <button onClick={increaseCountState}>State 증가</button>
      {/* Ref가 변경되지만 화면은 렌더링되지 않는다. */}
      <button onClick={increaseCountRef}>Ref 증가</button>
    </div>
  );
}

export default App;
