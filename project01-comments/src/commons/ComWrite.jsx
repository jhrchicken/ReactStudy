import React from "react";

function ComWrite(props){

  const writeProcess = (event) => {
    event.preventDefault();
    let writer = event.target.writer.value;
    let comment = event.target.comment.value;
    // 폼값 검증
    if (writer === '') {
      alert('작성자를 입력하세요.');
      event.target.writer.focus();
      return;
    }
    if (comment === '') {
      alert('댓글 내용을 입력하세요.');
      event.target.comment.focus();
      return;
    }
    // 작성
    props.onWriteComment(writer, comment);
    // 작성 후 폼값 초기화
    event.target.writer.value = '';
    event.target.comment.value = '';
  }
  
  return (<>
    <form onSubmit={writeProcess}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowspan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComWrite;  
