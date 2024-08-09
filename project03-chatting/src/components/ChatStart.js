import React from "react";
import { useRef } from "react";

function ChatStart() {
  const refRoom = useRef();
  const refUser = useRef();

  function openChatWin() {
    window.open(`/chat/talk?room=${refRoom.current.value}&user=${refUser.current.value}`, '', 'width=500, height=650');
  }

  return (
    <>
      <div className="App">
        <section>
          <div className="container py-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div className="card" id="chat2">
                  <div className="card-header d-flex justify-content-between align-items-center p-3" >
                  <h5 className="mb-0">채팅 프로그램</h5>
                  </div>
                  <div className="card-body" data-mdb-perfect-scrollbar-init style={{'position': 'relative', 'height': '600px', 'text-align': 'center'}}>
                    {/* 여기가 메인 */}
                    <input type="text" name="room" ref={refRoom} placeholder="ROOM"
                      className="form-control form-control-lg" id="exampleFormControlInput1" 
                      style={{'background-color':'#CCC'}} /><br/><br/>
                    <input type="text" name="user" ref={refUser} placeholder="USER NAME"
                      className="form-control form-control-lg" id="exampleFormControlInput1"
                      style={{'background-color':'#CCC'}} /><br/><br/>
                    <button type="button" className="btn btn-primary"
                        onClick={(event) => {
                        event.preventDefault();
                        if (refRoom.current.value === '') {
                          alert('방명을 작성하세요.');
                          return;
                        }
                        if (refUser.current.value === '') {
                          alert('사용자를 작성하세요.');
                          return;
                        }
                        openChatWin();
                      }}>채팅 시작</button>
                  </div>
                  <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3" 
                    style={{'border':'#fff', 'background-color':'#fff'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChatStart;