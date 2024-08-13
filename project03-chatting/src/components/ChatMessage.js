// 추가 기능 구현
// 날짜 별로 끊어서 보여주기
// 읽었을 때와 읽지 않았을 때 구분
// 스크롤 제대로 하기
// 한번에 여러개 보내면 사진 하나


import React from 'react';
import { realtime } from '../realtimeConfig';
import { ref, child, set, onValue, push } from 'firebase/database';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

// scrollBottom으로 바꿔보기
const scrollTop = (chatWindow) => {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
const scrollBottom = (chatWindow) => {
  chatWindow.scrollBottom = chatWindow.scrollBottom;
}

// 날짜 및 시간
const nowDateTime = () => {
  let dataObj = new Date();
  var hours = ('0' + dataObj.getHours()).slice(-2);
  var minutes = ('0' + dataObj.getMinutes()).slice(-2);
  return hours + ':' + minutes;
}

function ChatMessage() {
  // 파라미터 값 읽기
  const [searchParams, setSearchParams] = useSearchParams();
  const room = searchParams.get('room');
  const user = searchParams.get('user');

  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  // 대화 보내기 함수
  function messageSend(room, user, message) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, room + '/' + newPostKey), {
      user: user,
      message: message,
      time: nowDateTime()
    });
    console.log('입력성공');
  }

  // 대화 내용 출력
  const dbRef = ref(realtime, room);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        // 보낸 메세지
        if (childData.user === user) {
          showDiv.push(
            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{childData.message}</p>
                <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{childData.time}</p>
              </div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                alt="avatar 1" style={{'width':'45px', 'height': '100%'}} />
            </div>
          );
        }
        // 받은 메세지
        else {
          showDiv.push(
            <div className="d-flex flex-row justify-content-start">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 1" style={{'width':'45px', 'height':'100%'}} />
              <div>
                <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">{childData.message}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted">{childData.time}</p>
              </div>
            </div>
          );

        }
        // 스크롤바
        scrollTop(chatWindow.current);
      });
      setChatData(showDiv);
    });
  }, []);

  return(
    <div className="App">
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">{room}</h5>
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" data-mdb-ripple-color="dark"
                    onClick={() => { window.self.close(); }}>채팅방 나가기</button>
                </div>
                <div className="card-body" data-mdb-perfect-scrollbar-init style={{'position': 'relative', 'height': '600px'}} ref={chatWindow} > 
                  {chatData}
                </div>

                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                  alt="avatar 1" style={{'width': '40px', 'height': '100%'}} />&nbsp;&nbsp;
                  <form style={{'width':'100%', 'display':'flex'}} onSubmit={(event) => {
                      event.preventDefault();
                      let room = event.target.room.value;
                      let user = event.target.user.value;
                      let message = event.target.message.value;
                      if (message === '') {
                        return;
                      }
                      messageSend(room, user, message);
                      event.target.message.value = '';
                    }}>
                    <input type='hidden' name='room' value={room} />
                    <input type='hidden' name='user' value={user} />
                    <input type='text' name='message' className="form-control form-control-lg"    id="exampleFormControlInput1" style={{'width':'85%'}} />&nbsp;&nbsp;
                    <button type='submit' className='btn btn-primary' >전송</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>    
    </div>
  );
}

export default ChatMessage;