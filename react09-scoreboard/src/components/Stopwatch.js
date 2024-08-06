import React from "react";
import { useState, useRef } from "react";

export default function Stopwatch(props) {
  // 스탑워치가 동작중인지 확인하기 위한 State
  const [timerFlag, setTimerFlag] = useState(false);
  // 타이머에서 사용할 시간
  let [ticker, setTicker] = useState(0);
  // setInterval 함수의 참조값을 저장 후 clearInterval에서 중지할 때 사용
  let timerRef = useRef(0);

  // 스탑워치 시작
  const startTimer = () => {
    ticker++;
    // 1초에 한번씩 State를 변경한다.
    timerRef.current = setInterval(() => {
      console.log('틱톡');
      setTicker(ticker++);
    }, 1000);
  }
  // 스탑워치 중지 (Timer 변수를 이용한다. 여기서는 Ref를 사용하였다.)
  const stopTimer = () => {
    clearInterval(timerRef.current);
  }

  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      {/* 시간을 표시 */}
      <span className="stopwatch-time">{ticker}</span>
      {/* 시작/중지 버튼 */}
      <button onClick={() => {
        // 시작/중지를 토글해서 State에 적용
        setTimerFlag(!timerFlag);
        (timerFlag === true) ? stopTimer() : startTimer();
      }}>{(timerFlag === true) ? 'Stop' : 'Start'}</button>
      {/* Reset 버튼 */}
      <button onClick={() => {
        if (timerFlag === true) {
          // 타이머가 동작중이면 경고창을 띄운다.
          alert('스탑워치가 동작중입니다.')
        }
        else {
          // 타이머가 중지면 0으로 리셋한다.
          setTicker(0);
        }
      }}>Reset</button>
    </div>
  </>);
}