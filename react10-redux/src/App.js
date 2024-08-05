import './App.css';
// 리덕스 스토어를 생성하기 위한 패키지 임포트
import { legacy_createStore as createStore } from 'redux';
// 리덕스를 관리할 컴포넌트를 감싸주는 Provider 컴포넌트와 리덕스 관련 Hook을 위한 패키지 임포트
import { Provider, useSelector, useDispatch } from 'react-redux';

/*
  Redux(리덕스)란 ..
  : React로 제작한 애플리케이션의 상태관리를 위한 라이브러리로 React와 함께 사용됨지만 써드파티로 제공되므로 별도로 설치해야 한다.
  Provider
  : 어떤 컴포넌트에 State를 제공할지를 결정하는 Wrapper 컴포넌트로 여기서는 App 컴포넌트 하위의 <Left>, <Right> 컴포넌트를 감싸준다. 그러면 하위 컴포넌트에서 Store를 사용할 수 있다.
*/

/* State 생성 시 주입할 Reducer(리듀서)를 먼저 생성한다. 리듀서는 Store에 있는 State를 변경하기 위한 코드를 실행부로 정의한다. 파라미터는 2개가 필요하다.
currentState : 현재 State 값
action : State 변경에 필요한 요청 파라미터. 2개 이상의 값을 전달할 수 있어야 하므로 JSON 객체를 주로 사용한다. */
function reducer (currentState, action) {
  /* 최초 State가 정의되지 않은 상태라면 number를 1로 설정한다. 기존 App에서는 최상위 컴포넌트에서 useState 훅을 통해 State를 생성했지만 Redux가 도입되면 Store에서 State를 생성한 후 관리한다. */
  if (currentState === undefined) {
    return {
      number  : 1
    };
  }
  // 현재의 State의 복사본을 스프레드 연산자를 이용해서 생성한다.
  const newState = { ...currentState };
  // 요청 (Action)을 분석한 후 상태(State)를 변경한다.
  if (action.type === 'PLUS') {
    newState.number++;
  }
  // 변경된 State를 반환하여 적용한다.
  return newState;
}
// 앞에서 생성한 Reducer 함수를 인자로 Store(스토어)를 생성한다.
const store = createStore(reducer);

/* Store가 도입되면 Right, Left에서 Props를 통해 관리하던 값이나 함수는 더 이상 필요없다. 모든 State를 Store를 통해 관리/전달되기 때문이다. */
function Right1() {
  return(
    <div>
      <h2>Right1</h2>
      <Right2></Right2>
    </div>
  );
}

function Right2() {
  return(
    <div>
      <h2>Right2</h2>
      <Right3></Right3>
    </div>
  );
}

/*
  useDispatch 훅
  : State 값을 변경할 때 Reducer 함수를 호출하는 역할을 한다.
*/
function Right3() {
  /* type을 PLUS로 설정하여 Store에 정의된 Reducer 함수를 호출한다. JSON 객체로 생성하면 되고, 이 객체를 Action 이라고 한다. */
  const dispatch = useDispatch();
  return(
    <div>
      <h2>Right3</h2>
      <input type='button' value='+' onClick={() => {
        dispatch({type : 'PLUS'})
      }}></input>
    </div>
  );
}

const Left1 = () => {
  return(
    <div>
      <h2>Left1</h2>
      <Left2></Left2>
    </div>
  );
}

const Left2 = () => {
  return(
    <div>
      <h2>Left2</h2>
      <Left3></Left3>
    </div>
  );
}

/*
  useSelector 훅
  : State 값을 선택할 때 사용하는 Redux에서 제공하는 훅
*/
const Left3 = () => {
  /* Store에 정의된 여러개의 State 중 어떤 값을 받을 지 정의한 함수를 useSelector의 인자로 전달한다. 이 함수는 개발자가 여러가지 형태로 커스텀 할 수 있다. */
  const number = useSelector((state) => {return state.number});
  return(
    <div>
      <h2>Left3 : {number}</h2>
    </div>
  );
}


function App() {
  // Store가 있으므로 App에서 State를 관리하지 않는다.
  // const [number, setNumber] = useState(1);

  return (
    <div className="root">
      <h2>React - Redux</h2>
      <div id='grid'>
        {/* 하위 컴포넌트를 Wrapping하면 Store를 사용할 수 있게 된다. 이때 앞에서 생성한 Store를 Props로 사용한다. */}
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

export default App;
