import '../Chat.css';
import React from 'react';
import { realtime } from '../realtimeConfig';
import { ref, child, set, onValue, push } from 'firebase/database';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const scrollTop = (chatWindow) => {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ChatMessage() {
  // 쿼리스트링으로 전달된 파라미터를 조작할 때 사용하는 라우터 훅
  const [searchParams, setSearchParams] = useSearchParams();
  // 두 개의 파라미터를 읽어온다.
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  // 채팅내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();
  // 채팅 데이터 저장용 State
  const [chatData, setChatData] = useState('');

  // Realtime에 대화내역 저장
  function messageWrite(chatRoom, chatId, chatMessage)  {
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    // '방명' 하위에 '고유키'로 구분하여 대화내역을 입력
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage
    });
    console.log('입력성공');
  }

  // Realtime 리스너 정의
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === userId) {
          // 본인이 보낸 메세지는 우측으로 정렬
          showDiv.push(
            <div className='myMsg' style={{'textAlign': 'right'}}>
              {childData.message}
            </div>
          );
        }
        else {
          // 상대방이 보낸 메세지는 좌측으로 정렬
          showDiv.push(<div>{childData.message}</div>);
        }
        // 스크롤바를 제일 아래로 내린다.
        scrollTop(chatWindow.current);
      });
      // State를 변경해서 대화내역을 새롭게 렌더링한다.
      setChatData(showDiv);
    });
  }, []);

  return(
    <>
      <div className='App'>
        <h2>Realtime 채팅</h2>
        대화명 : {userId} &nbsp;&nbsp;
        <button id='closeBtn' onClick={() => { window.self.close(); }}>
          채팅 종료
        </button>
        <div id='chatWindow' ref={chatWindow}>
          {chatData}
        </div>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            let chatRoom = e.target.chatRoom.value;
            let chatId = e.target.chatId.value;
            if (chatId === '') {
              alert('대화명을 입력하세요');
              return;
            }

            let message = e.target.message.value;
            if (message === '') {
              alert('메세지를 입력하세요');
              return;
            }
            
            // 입력한 폼값을 정리해서 Realtime에 입력한다.
            messageWrite(chatRoom, chatId, message);
            // 입력이 완료되면 <input>을 비워준다.
            e.target.message.value = '';
          }}>
            <input type='hidden' name='chatRoom' value={roomId} />
            <input type='hidden' name='chatId' value={userId} />
            <input type='text' name='message' />
            <button type='submit'>전송</button>
          </form>
        </div>
      </div>
    </>

  );

}

export default ChatMessage;