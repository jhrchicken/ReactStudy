import React from "react";
import { useState } from "react";
import ComEdit from "./ComEdit";

function ComList(props){

  let lists = [];
  const [showEdit, setShowEdit] = useState(false);

  for (let row of props.myData) {
    lists.push(
      <>
      <table id="boardTable">
        <tr>
          <td>{row.no}</td>
          <td>Writer : {row.writer}</td>
          <td>
            {row.date}
            <button type="button" onclick={(event) => {
              event.preventDefault();
              setShowEdit(!showEdit);
              console.log(showEdit);
            }}>수정</button>
            <button type="button" onclick={() => {
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
        showEdit === false ? '틀림' : 
          <ComEdit no={row.no} writer={row.writer} comment={row.comment}
            onEditPlayer={props.onEditPlayer}
            showEdit={showEdit} setShowEdit={setShowEdit} />
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