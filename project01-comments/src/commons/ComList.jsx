import React from "react";
import { useState } from "react";
import ComEdit from "./ComEdit";

function ComList(props){

  let lists = [];
  const [showEdit, setShowEdit] = useState(false);
  const [editNo, setEditNo] = useState(null);

  const checkEdit = (no) => {
    if (showEdit === true) {
      alert("현재 수정 mode 입니다. 수정 취소를 먼저 눌러주세요.");
      setShowEdit(true);
    } else {
      setEditNo(no);
    }
  };

  for (let row of props.myData) {
    lists.push(
      <>
      <table id="boardTable">
        <tr>
          <td>{row.no}</td>
          <td>Writer : {row.writer}</td>
          <td>
            {row.date}
            <button type="button" onClick={(event) => {
              event.preventDefault();
              setShowEdit(!showEdit);
              checkEdit(row.no);
              console.log(showEdit);
            }}>수정</button>
            <button type="button" onClick={() => {
              if (window.confirm('삭제하시겠습니까?')) {
                props.onDeleteComment(row.no);
              }
            }}>삭제</button>
          </td>
        </tr>
        <tr>
          <td colspan="3" className="subject">{row.comment}</td>
        </tr>
      </table>
      {
        editNo !== row.no ? null  :
          <ComEdit no={row.no} writer={row.writer} comment={row.comment}
            onEditComment={props.onEditComment}
            showEdit={showEdit} setShowEdit={setShowEdit}
            editNo={editNo} setEditNo={setEditNo} />
      }
      </>
    );
  }

  return (
    <>
      {lists}
    </>
  );
}

export default ComList;