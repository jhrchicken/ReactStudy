import React from "react";
import { useState } from "react";

// 함수의 선언과 동시에 export 한다.
export default function EditPlayerForm(props) {

  const [playerName, setPlayerName] = useState(props.playerName);

  return (<>
    <form className="form" noValidate
      onSubmit={(e) => {
        e.preventDefault();

        // 입력값이 없는 경우 경고창을 띄우고 포커스를 이동 후 실행 중지
        if (e.target.player.value === '') {
          alert('이름을 입력하세요.');
          e.target.player.focus();
          return;
        }

        // Event 객체의 target을 통해 입력한 이름을 얻어옴
        let playerName = e.target.player.value;
        // 부모에서 전달된 함수를 호출하여 플레이어 추가
        props.onEditPlayer(props.playerIdx, playerName);
        // 다음 입력을 위해 입력란 비움
        e.target.player.value = '';
      }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={(e)=>{setPlayerName(e.target.value); }}
          value={playerName} />
      <input type="submit" className="input" value="Edit" />
    </form>
  </>);
}