import React from 'react'
import { useNavigate } from 'react-router-dom';

function MyWrite(props) {
  // 페이지 이동을 위한 훅으로 JSP의 sendRedirect()와 동일하다.
  const navigate = useNavigate();

  return (
    <div>
      <h2>Spring 게시판 [작성]</h2>
      <form onSubmit={(event) => {
        // submit이 되면 화면의 깜빡임이 생기므로 차단
        event.preventDefault();
        // Event 객체를 통해 폼값 받음
        let id = event.target.id.value;
        let title = event.target.title.value;
        let content = event.target.content.value;

        // 파라미터 저장을 위한 JS의 객체로 DTO와 동일한 역할을 한다.
        const params = new URLSearchParams();
        params.set('id', id);
        params.set('title', title);
        params.set('content', content);

        /* POST 방식으로 데이터 전송하기 위한 JSON 객체 생성
        body 프로퍼티에 실제 전송할 폼값을 지정한다. */
        const data = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: params
        };

        // Spring 서버와 통신 (POST 방식으로 요청)
        fetch('http://localhost:8586/restBoardWrite.do', data)
        .then((result) => {
          return result.json();
        })
        .then((json) => {
          if (json.result === 1) {
            console.log('글쓰기 성공');
          }
        });
        // 글쓰기가 완료되면 목록으로 이동한다.
        navigate("/list");
      }}>

        <table border='1'>
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type='text' name='id' value='musthave' /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type='text' name='title' /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name='content' cols='22' rows='3'></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default MyWrite;